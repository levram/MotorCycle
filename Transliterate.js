var transliterate = function(string) {
    var from = 'ŠŒŽšœžŸ¥µÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖŐØÙÚÛÜŰÝßàáâãäåæçèéêëìíîïðñòóôõöőøùúûüűýÿ',
        to =   'SOZsozYYuAAAAAAACEEEEIIIIDNOOOOOOOUUUUUYsaaaaaaaceeeeiiiionooooooouuuuuyy';
    for(var i = 0; i < from.length; i++) {
        string = string.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
    return string;
}
