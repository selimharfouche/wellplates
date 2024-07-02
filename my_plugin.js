// categorizeNamespacesAndModules.js

const helper = require('jsdoc/util/templateHelper');
const fs = require('jsdoc/fs');
const path = require('jsdoc/path');
const util = require('util');

const htmlsafe = helper.htmlsafe;
const linkto = helper.linkto;
const resolveAuthorLinks = helper.resolveAuthorLinks;
const hasOwnProp = Object.prototype.hasOwnProperty;

function buildMemberNav(items, itemHeading, itemsSeen, linktoFn) {
    let nav = '';

    if (items.length) {
        let itemsNav = '';

        items.forEach(item => {
            let displayName;

            if (!hasOwnProp.call(item, 'longname')) {
                itemsNav += `<li>${linktoFn('', item.name)}</li>`;
            } else if (!hasOwnProp.call(itemsSeen, item.longname)) {
                if (env.conf.templates.default.useLongnameInNav) {
                    displayName = item.longname;
                } else {
                    displayName = item.name;
                }
                itemsNav += `<li>${linktoFn(item.longname, displayName.replace(/\b(module|event):/g, ''))}</li>`;

                itemsSeen[item.longname] = true;
            }
        });

        if (itemsNav !== '') {
            nav += `<h3>${itemHeading}</h3><ul>${itemsNav}</ul>`;
        }
    }

    return nav;
}

function buildNav(members) {
    let globalNav;
    let nav = '<h2><a href="index.html">Home</a></h2>';
    const seen = {};
    const seenTutorials = {};
    const parentNamespaces = [];
    const childNamespaces = {};

    // Categorize namespaces into parent and child namespaces
    members.namespaces.forEach(ns => {
        if (ns.memberof) {
            if (!childNamespaces[ns.memberof]) {
                childNamespaces[ns.memberof] = [];
            }
            childNamespaces[ns.memberof].push(ns);
        } else {
            parentNamespaces.push(ns);
        }
    });

    // Build navigation for parent namespaces
    nav += buildMemberNav(parentNamespaces, 'Client', seen, linkto);

    // Build navigation for modules
    nav += buildMemberNav(members.modules, 'Server', {}, linkto);
    nav += buildMemberNav(members.externals, 'Externals', seen, linktoExternal);
    nav += buildMemberNav(members.classes, 'Classes', seen, linkto);
    nav += buildMemberNav(members.interfaces, 'Interfaces', seen, linkto);
    nav += buildMemberNav(members.events, 'Events', seen, linkto);
    nav += buildMemberNav(members.mixins, 'Mixins', seen, linkto);
    nav += buildMemberNav(members.tutorials, 'Tutorials', seenTutorials, linktoTutorial);

    if (members.globals.length) {
        globalNav = '';

        members.globals.forEach(({ kind, longname, name }) => {
            if (kind !== 'typedef' && !hasOwnProp.call(seen, longname)) {
                globalNav += `<li>${linkto(longname, name)}</li>`;
            }
            seen[longname] = true;
        });

        if (!globalNav) {
            // turn the heading into a link so you can actually get to the global page
            nav += `<h3>${linkto('global', 'Global')}</h3>`;
        } else {
            nav += `<h3>Global</h3><ul>${globalNav}</ul>`;
        }
    }

    return nav;
}

exports.publish = (taffyData, opts, tutorials) => {
    const template = require('jsdoc/template');
    const view = new template.Template(opts.template);

    const data = helper.prune(taffyData);
    const members = helper.getMembers(data);
    const outputSourceFiles = (opts.template && opts.template.default && opts.template.default.outputSourceFiles) !== false;

    // Set up templating
    const templatePath = path.normalize(opts.template);
    view.layout = opts.template.default.layoutFile ?
        path.getResourcePath(path.dirname(opts.template.default.layoutFile), path.basename(opts.template.default.layoutFile)) :
        'layout.tmpl';

    // Generate the navigation
    view.nav = buildNav(members);

    // Generate the documentation
    generateDocumentation(view, members, tutorials, opts);

    // Generate pretty-printed source files
    if (outputSourceFiles) {
        generateSourceFiles(data, opts.encoding, opts.destination);
    }
};

function generateDocumentation(view, members, tutorials, opts) {
    const files = helper.find(members, { kind: 'file' });
    const packages = helper.find(members, { kind: 'package' });

    const mainPage = {
        kind: 'mainpage',
        readme: opts.readme,
        longname: (opts.mainpagetitle) ? opts.mainpagetitle : 'Main Page'
    };

    const data = packages.concat(mainPage).concat(files);

    helper.generate(view, 'Home', data, helper.getUniqueFilename('index'), opts.resolveLinks);
}

function generateSourceFiles(data, encoding, destination) {
    const sourceFiles = {};

    data().each(doclet => {
        if (doclet.meta) {
            const sourcePath = helper.getPathFromDoclet(doclet);
            sourceFiles[sourcePath] = {
                resolved: sourcePath,
                shortened: null
            };
        }
    });

    // Copy the source files to the output directory
    if (Object.keys(sourceFiles).length) {
        helper.generateSourceFiles(sourceFiles, encoding, destination);
    }
}
