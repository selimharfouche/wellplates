exports.defineTags = function (dictionary) {
    dictionary.defineTag('partof', {
        onTagged: function (doclet, tag) {
            doclet.partof = tag.value;
        }
    });
};


/*
Below is publish.txt , is the edited publish.js of JSDOcs
- I added: @partof, which works on parent namespaces
- removed the namespace word when you click on the paretn namespace


*/