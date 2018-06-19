onmessage = function(e) {
    var filter = e.data.filter;
    var rows = e.data.rows;
    
    var tmp = [];
        
    for (var i in rows) {
        for (var j in rows[i]) {
            if (String(rows[i][j]).toLowerCase().trim().indexOf(filter.toLowerCase().trim()) > -1) { //if the cell contains the search term as a substring
                tmp.push(rows[i]);
                break; //so the same row isn't pushed to the filteredTable multiple times
            }
        }
    }
    
    postMessage(tmp);
}
