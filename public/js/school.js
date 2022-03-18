//搜尋學校
function searchSch() {
    var input = document.getElementById("searchSchool");
    var filter = input.value;
    var table = document.getElementById("schoolTable");
    var tr = table.getElementsByTagName("tr");

    for (var i = 0; i < tr.length; i++) {
        var  td = tr[i].getElementsByTagName("td")[1];

        if (td) {
            var text = td.textContent || td.innerText;

            if (text.indexOf(filter) > -1) {
                tr[i].style.display = "";
            } 
            else {
                tr[i].style.display = "none";
            }
        }
    }
}

//排序報考日期、考試日期、放榜日期
function sortTable(n) {
    var rows, shouldSwitch, count = 0;
    var table = document.getElementById("schoolTable");
    var switchTF = true;
    var dir = "asc";

    while (switchTF) {
        switchTF = false;
        rows = table.rows;

        for (var i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            var x = rows[i].getElementsByTagName("td")[n];
            var y = rows[i + 1].getElementsByTagName("td")[n];

            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } 
            else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                }
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switchTF = true;
            count ++;
        } 
        else {
            if (count == 0 && dir == "asc") {
                dir = "desc";
                switchTF = true;
            }
        }
    }
}