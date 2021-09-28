//Just inject this into the page that you want to scrape
//Inject by copy and pasting the script into the console

var a = document.getElementsByTagName("tr")
var data = []

function download_csv_file() {
    //define the heading for each row of the data
    var csv = 'Company,Hourly Pay, Monthly Pay, Application Link\n';
  	let len = data.length;
  	for(j = 0; j < len; j++) {
      if(data[j][0] !== "N/A" && data[j][3] !== "N/A") {
        csv += data[j].join(',');
        csv += "\n";
      }
    }

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'Intern Positions from LevelsFYI.csv';
    hiddenElement.click();
}

function parseData() {
  for(i = 0; i < a.length; i++) {
    let lineData = [];
    let name = a[i].innerHTML.split("font-weight-bold mt-1 mb-2 mx-auto\">")[1]
    let salary = a[i].innerHTML.split("$")
    let links = a[i].innerHTML.split("href=")
    let link = links[links.length - 1]

    if(name){
      lineData.push(name.replaceAll(",", "").split(" <")[0])
    }
    else {
      lineData.push("N/A")
    }

    if(salary[1]) {
      let daily = salary[1]
      lineData.push("Hourly: $" + daily.replace(",", "").split("<")[0])
    }
    else {
      lineData.push("N/A")
    }

    if(salary[2]) {
      let monthly = salary[2]
      lineData.push("Monthly: $" + monthly.replace(",", "").split("<")[0])
    }
    else {
      lineData.push("N/A")
    }

    if(link){
     var extra = link.replaceAll("\"","").split(">")[0]
     //remember that hashtags (#) completely break CSV files...
     lineData.push(extra.split("ref=levels.fyi")[0])
    }
    else {
      lineData.push("N/A")
    }
    data.push(lineData)
  }
}
parseData()
download_csv_file()

