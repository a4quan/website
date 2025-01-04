
function countNumbersInBuckets(bucketArray, numbersArray) {
    // Initialize an array to store the counts for each bucket
    let bucketCounts = new Array(bucketArray.length).fill(0);

    // Iterate through each number in the numbersArray
    for (let number of numbersArray) {
        // Find the bucket where the number belongs
        let bucketIndex = findBucketIndex(bucketArray, number);

        // Increment the count for that bucket
        if (bucketIndex !== -1) {
            bucketCounts[bucketIndex]++;
        }
    }
    bucketCounts[9] = bucketCounts[9] + 1

    return bucketCounts;
}

function help(elem) {
    if (elem == "") {
        if (window.getComputedStyle(document.getElementById("container")).getPropertyValue("opacity") == 1) {
            document.getElementById("container").style.opacity = 0;
            document.getElementById("leg").style.opacity = 0;
            document.getElementById('toggleID2').style.opacity = 0;
            document.getElementById('catTitle').style.display = "none";
            document.getElementById('catDesc').style.display = "none";
            document.getElementById('helperText').style.display = "block";
            document.getElementById('helpCon').style.backgroundColor = "#4d4d4d";
            document.getElementById('container').style.display = "none";
        } else {
            document.getElementById("container").style.opacity = 1;
            document.getElementById("leg").style.opacity = 1;
            document.getElementById('toggleID2').style.opacity = 1;
            document.getElementById('catTitle').style.display = "block";
            document.getElementById('catDesc').style.display = "block";
            document.getElementById('helperText').style.display = "none";
            document.getElementById('helpCon').style.backgroundColor = "#252427";
            document.getElementById('container').style.display = "block";
        }
    }
    if (elem == "back") {
        document.getElementById("container").style.opacity = 1;
        document.getElementById("leg").style.opacity = 1;
        document.getElementById('toggleID2').style.opacity = 1;
        document.getElementById('catTitle').style.display = "block";
        document.getElementById('catDesc').style.display = "block";
        document.getElementById('helperText').style.display = "none";
        document.getElementById('helpCon').style.backgroundColor = "#252427";
        document.getElementById('container').style.display = "block";
    }
}


function findBucketIndex(bucketArray, number) {
    // Binary search to find the index of the bucket for the given number
    let low = 0;
    let arrayLength = bucketArray.length;

    while (low <= arrayLength) {
        if (number >= bucketArray[low] && number < bucketArray[low + 1]) {
            return low;
        }
        low = low + 1;
    }

    return -2; // Number does not fall into any bucket
}

function approximatelyEqual(a, b, epsilon) {
    var start = 0
    while (start < b.length) {
        if (Math.abs(a - b[start]) < epsilon) {
            return start;
        } else {
            start = start + 1
        }
    }
}

function arrBuckets(arr) {
    // Filter non-number elements
    arr = arr.filter(function (value) {
        return typeof value === 'number' && !isNaN(value);
    });
    
    // Sort array
    arr = arr.slice().sort(function (a, b) {
        return a - b;
    });

    var newArr = [];
    newArr.push(arr[0]);

    var x = 1
    while (x <= 10) {
        var j = (x / 10) * arr.length
        if (j % 1 !== 0) {
            j = ((j % 1) * arr[Math.round(j)]) + ((1 - (j % 1)) * arr[Math.round(j) + 1])
        } else {
            j = arr[j - 1]
        }
        newArr.push(j)
        x = x + 1
    }

    return newArr;
      
}

function mapNumberToRange(inputNumber, customArray) {
    // Assuming customArray is an array of increasing numbers
  
    // Check if the inputNumber is less than the first element in the array
    if (inputNumber < customArray[0]) {
      return 0; // Return 0 or any other default value for this case
    }
  
    // Check if the inputNumber is greater than or equal to the last element in the array
    if (inputNumber >= customArray[customArray.length - 1]) {
      return customArray.length - 1; // Return the last index or any other value for this case
    }
  
    // Iterate through the array to find the appropriate range
    for (let i = 0; i < customArray.length - 1; i++) {
      if (inputNumber >= customArray[i] && inputNumber < customArray[i + 1]) {
        return i + 1; // Return the index or any other value for this range
      }
      if (inputNumber == 0) {
        if (customArray[0] === 0) {
            if (customArray[1] === 0) {
                return 1;
            }
        }
      }
    }
  }

// SVG FUNCTIONS
    function mouseover(d,pro,o) {   
    if (normalChange == 1 && criToggle == true && o == true) {
        valueLabel.text("")
    }
    //var mOverRegionData = dataMap.get(d.properties.AREA_LONG_CODE)["ARHr2023"]; 
    //mapLabel.text(d.properties.AREA_LONG_CODE + " " + d.properties.AREA_NAME + " " + pro) // remove suffix id from name
    if (pro == NaN) {
        valueLabel.text("")
    } else if (category[1]==='num') {
        pro = Math.round(pro)
        valueLabel.text(pro)
    } else if (category[1]==='per') {
        pro = (pro * 100).toFixed(1) + "%"
        valueLabel.text(pro)
    } else if (category[1]==='dec') {
        pro = Math.round(pro * 10) / 10;
        valueLabel.text(pro)
    } else if (category[1]=='money') {
        pro = pro.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
        });
        valueLabel.text("$" + new Intl.NumberFormat().format(pro));
    };
    if (d.properties !== undefined) {
        mapLabel.text(d.properties.AREA_NAME)
    }
    if (normalChange == 1 && criToggle == true && o == true) {
        const numberOfSpaces = 5;
        const spaces = Array(numberOfSpaces).fill("\u00A0").join("");

        tSpan = valueLabel.append("tspan")
                    .text(spaces + Math.abs(((pro / pastData) * 100 - 100)).toFixed(2) + "%")
                    .style("font-size", "18px")
                    .append("tspan")
                    .text(function() {
                        console.log((pro / pastData) * 100 - 100)
                          if (category[0] == "totPop") {
                            if (((pro / pastData) * 100 - 100) > 0) {
                                return " increase since " + defYear + " (" + parseFloat(pastData).toFixed(0) + ")"
                                } else if (((pro / pastData) * 100 - 100) < 0) {
                                return " decrease since " + defYear + " (" + parseFloat(pastData).toFixed(0) + ")"
                                } else {
                                return " No change since " + defYear + "."
                                }

                          } else {
                            if (((pro / pastData) * 100 - 100) > 0) {
                                return " increase since " + defYear + " (" + parseFloat(pastData).toFixed(2) + ")"
                                } else if (((pro / pastData) * 100 - 100) < 0) {
                                return " decrease since " + defYear + " (" + parseFloat(pastData).toFixed(2) + ")"
                                } else {
                                return " No change since " + defYear + "."
                                }
                          }
                        }
                        )
                    .style("font-size", "16px")
                    .style("fill", "black")
    }
    }

    function mouseout(d) {     
    mapLabel.text("")  // remove out name
    valueLabel.text("") 
    }

    function clicked(d) {
    // Add code here
    }

    function mouseoverLegend(d) {

    }

    function processData(data) {

        // Example: Calculate the average of the 'value' column
        var total = 0;
        data.forEach(function(row) {
            total += parseFloat(row.value);
        });
        var average = total / data.length;
    }

    function decimalToPercentage(decimalNumber) {
        // Convert to percentage and format using toLocaleString
        return (decimalNumber * 1).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function toggleBold(id) {
        averageMedian = 0
        toggleCheckbox2.checked = false;
        unboldTog();
        var paragraph = document.getElementById(id);
        if (id.startsWith('togq')) {
            paragraph.parentNode.parentNode.parentNode.querySelector('.menuI').querySelector('p').style.fontWeight = 'bold';
        }
        
        // Check if the font-weight is currently bold
        var isBold = paragraph.style.fontWeight === 'bold';

        // Toggle the font-weight style
        paragraph.style.fontWeight = isBold ? 'normal' : 'bold';
    }

    function unboldTog() {
        var paragraphs = document.querySelectorAll('p[id^="' + "tog" + '"]');
        
        // Iterate through paragraphs starting with the given prefix
        paragraphs.forEach(function(paragraph) {
        paragraph.style.fontWeight = 'normal';
        });
    }

    function changeVariable(cat) {
        valueLabel.text("")
        if (category[0] !== cat[0]) {
            var rectangles = document.querySelectorAll('.rectangle');
                rectangles.forEach(function(rectangle) {
                rectangle.style.width = '0';
            });
        }
        category = cat;
        sliderOn = false;
        counter = 1;
        render();

        document.getElementById("catTitle").textContent = category[0]

        const toggleArr = ['2averageAge','4avgIncome','4tax','4market','4employment','4gov','4ei','4covid','11a','12a',
                            '2averageAgeM','4avgIncomeM','4taxM','4marketM','4employmentM','4govM','4eiM','4covidM','11aM','12aM']

        if (category[0]=="tempPop") {
        container2.style.display = 'block';
        } else {
        container2.style.display = 'none'; 
        }

        if (category[0].startsWith("crime") || category[0].startsWith("crisis") || category[0].startsWith("totPop")) {
            //svg
            //.attr("width", 500)
            //.attr("height", 500)
            w = -0.00135
            h = -0.0005
            mapWidth = 800
            mapHeight = 650
            svg.selectAll("rect#graph")
            .transition().delay(1000).duration(1000)
            .attr("opacity",0)
            sliderYear.style.display = "block"
            setTimeout(() => {
                sliderYear.style.opacity = 1
            }, 1000);
        } else {
            w = 0
            h = 0.00
            mapWidth = 900
            mapHeight = 700
            svg.selectAll("rect#graph")
            .transition().duration(1000)
            .attr("opacity",1)
            sliderYear.style.opacity = 0
            setTimeout(() => {
                sliderYear.style.display = "none"
            }, 1000);
        }

        if (category[0] === "2averageAge") {
            document.getElementById("catTitle").textContent = "Average Age of Population (2021)";
            document.getElementById("catDesc").textContent = "Average age of population in neighbourhood."
            dataSource = "https://open.toronto.ca/dataset/neighbourhood-profiles/"
            criToggle = false; medianToggle = true; normalChange = 0;
        }
        if (category[0] === "2averageAgeM") {
            document.getElementById("catTitle").textContent = "Median Age of Population (2021)"
            document.getElementById("catDesc").textContent = "Median age of population in neighbourhood."
            dataSource = "https://open.toronto.ca/dataset/neighbourhood-profiles/"
            criToggle = false; medianToggle = true; normalChange = 0;
        }
        if (category[0] === "4avgIncome") {
            document.getElementById("catTitle").textContent = "Average Total Income (2020)"
            document.getElementById("catDesc").textContent = "Average total income of neighbourhood population in 2020."
            dataSource = "https://open.toronto.ca/dataset/neighbourhood-profiles/"
            criToggle = false; medianToggle = true; normalChange = 0;
        }
        if (category[0] === "4avgIncomeM") {
            document.getElementById("catTitle").textContent = "Median Total Income (2020)"
            document.getElementById("catDesc").textContent = "Median total income of neighbourhood population in 2020."
            dataSource = "https://open.toronto.ca/dataset/neighbourhood-profiles/"
            criToggle = false; medianToggle = true; normalChange = 0;
        }
        if (category[0] === "4tax") {
            document.getElementById("catTitle").textContent = "Average After-Tax Income (2020)"
            document.getElementById("catDesc").textContent = "Average after-tax income of neighbourhood population in 2020."
            dataSource = "https://open.toronto.ca/dataset/neighbourhood-profiles/"
            criToggle = false; medianToggle = true; normalChange = 0;
        }
        if (category[0] === "4taxM") {
            document.getElementById("catTitle").textContent = "Median After-Tax Income (2020)"
            document.getElementById("catDesc").textContent = "Median after-tax total income of neighbourhood population in 2020."
            dataSource = "https://open.toronto.ca/dataset/neighbourhood-profiles/"
            criToggle = false; medianToggle = true; normalChange = 0;
        }
        if (category[0] === "4market") {
            document.getElementById("catTitle").textContent = "Average Market Income (2020)"
            document.getElementById("catDesc").textContent = "Average market income of neighbourhood population in 2020."
            dataSource = "https://open.toronto.ca/dataset/neighbourhood-profiles/"
            criToggle = false; medianToggle = true; normalChange = 0;
        }
        if (category[0] === "4marketM") {
            document.getElementById("catTitle").textContent = "Median Market Income (2020)"
            document.getElementById("catDesc").textContent = "Median market income of neighbourhood population in 2020."
            dataSource = "https://open.toronto.ca/dataset/neighbourhood-profiles/"
            criToggle = false; medianToggle = true; normalChange = 0;
        }
        if (category[0] === "4employment") {
            document.getElementById("catTitle").textContent = "Average Employment Income (2020)"
            document.getElementById("catDesc").textContent = "Average income of neighbourhood population from employment in 2020."
            dataSource = "https://open.toronto.ca/dataset/neighbourhood-profiles/"
            criToggle = false; medianToggle = true; normalChange = 0;
        }
        if (category[0] === "4employmentM") {
            document.getElementById("catTitle").textContent = "Median Employment Income (2020)"
            document.getElementById("catDesc").textContent = "Median income of neighbourhood population from employment in 2020."
            dataSource = "https://open.toronto.ca/dataset/neighbourhood-profiles/"
            criToggle = false; medianToggle = true; normalChange = 0;
        }
        if (category[0] === "4gov") {
            document.getElementById("catTitle").textContent = "Average Government Transfer Income (2020)"
            document.getElementById("catDesc").textContent = "Average income of neighbourhood population from government transfers in 2020."
            dataSource = "https://open.toronto.ca/dataset/neighbourhood-profiles/"
            criToggle = false; medianToggle = true; normalChange = 0;
        }
        if (category[0] === "4govM") {
            document.getElementById("catTitle").textContent = "Median Government Transfer Income (2020)"
            document.getElementById("catDesc").textContent = "Median income of neighbourhood population from government transfers in 2020."
            dataSource = "https://open.toronto.ca/dataset/neighbourhood-profiles/"
            criToggle = false; medianToggle = true; normalChange = 0;
        }
        if (category[0] === "4ei") {
            document.getElementById("catTitle").textContent = "Average Employee Insurance Benefit (2020)"
            document.getElementById("catDesc").textContent = "Average employee insurance received by neighbourhood population 2020."
            dataSource = "https://open.toronto.ca/dataset/neighbourhood-profiles/"
            criToggle = false; medianToggle = true; normalChange = 0;
        }
        if (category[0] === "4eiM") {
            document.getElementById("catTitle").textContent = "Median Employee Insurance Benefit (2020)"
            document.getElementById("catDesc").textContent = "Median employee insurance received by neighbourhood population 2020."
            dataSource = "https://open.toronto.ca/dataset/neighbourhood-profiles/"
            criToggle = false; medianToggle = true; normalChange = 0;
        }
        if (category[0] === "4covid") {
            document.getElementById("catTitle").textContent = "Average COVID-19 Emergency Payment (2020)"
            document.getElementById("catDesc").textContent = "Average COVID-19 emergency payment received by neighbourhood population 2020."
            dataSource = "https://open.toronto.ca/dataset/neighbourhood-profiles/"
            criToggle = false; medianToggle = true; normalChange = 0;
        }
        if (category[0] === "4covidM") {
            document.getElementById("catTitle").textContent = "Median COVID-19 Emergency Payment (2020)"
            document.getElementById("catDesc").textContent = "Median COVID-19 emergency payment received by neighbourhood population 2020."
            dataSource = "https://open.toronto.ca/dataset/neighbourhood-profiles/"
            criToggle = false; medianToggle = true; normalChange = 0;
        }
        if (category[0] === "8owner") {
            document.getElementById("catTitle").textContent = "Home Ownership Rate (2021)"
            document.getElementById("catDesc").textContent = "Percent of residents that live in a dwelling that they or their family owns."
            dataSource = "https://open.toronto.ca/dataset/neighbourhood-profiles/"
            criToggle = false; medianToggle = false; normalChange = 0;
        }
        if (category[0] === "8renter") {
            document.getElementById("catTitle").textContent = "Home Rental Rate (2021)"
            document.getElementById("catDesc").textContent = "Percent of residents that live in a dwelling that they or their family rents."
            dataSource = "https://open.toronto.ca/dataset/neighbourhood-profiles/"
            criToggle = false; medianToggle = false; normalChange = 0;
        }
        if (category[0] === "tempPop") {
            document.getElementById("catTitle").textContent = "Percentage of Population within Age Range (2021)"
            document.getElementById("catDesc").textContent = "Percentage of population within selected age range in neighbourhood."
            dataSource = "https://open.toronto.ca/dataset/neighbourhood-profiles/"
            criToggle = false; medianToggle = false; normalChange = 0;
        }
        if (category[0] === "crimeAssault") {
            criCat = "ASSAULT_RATE_"
            document.getElementById("catTitle").textContent = "Assault Rate" + criYearString
            document.getElementById("catDesc").textContent = "Number of assaults that occur in neighbourhood per 100,000 residents."
            if (ageSlider1 !== ageSlider2) {
                document.getElementById("catDesc").textContent = "Average n" + document.getElementById("catDesc").textContent.slice(1, - 1) + " per year."
            }
            dataSource = "https://open.toronto.ca/dataset/neighbourhood-crime-rates/"
            criToggle = true; medianToggle = 2; normalChange = 0; svg.selectAll("text#buttonMedian").text("View Percentage Change Over Time");
        }
        if (category[0] === "crimeAutoTheft") {
            criCat = "AUTOTHEFT_RATE_"
            document.getElementById("catTitle").textContent = "Auto Thefts" + criYearString
            document.getElementById("catDesc").textContent = "Number of auto thefts that occur in neighbourhood per 100,000 residents."
            if (ageSlider1 !== ageSlider2) {
                document.getElementById("catDesc").textContent = "Average n" + document.getElementById("catDesc").textContent.slice(1, - 1) + " per year."
            }
            dataSource = "https://open.toronto.ca/dataset/neighbourhood-crime-rates/"
            criToggle = true; medianToggle = 2; normalChange = 0; svg.selectAll("text#buttonMedian").text("View Percentage Change Over Time");
        }
        if (category[0] === "crimeBikeTheft") {
            criCat = "BIKETHEFT_RATE_"
            document.getElementById("catTitle").textContent = "Bike Thefts" + criYearString
            document.getElementById("catDesc").textContent = "Number of bicycle thefts that occur in neighbourhood per 100,000 residents."
            if (ageSlider1 !== ageSlider2) {
                document.getElementById("catDesc").textContent = "Average n" + document.getElementById("catDesc").textContent.slice(1, - 1) + " per year."
            }
            dataSource = "https://open.toronto.ca/dataset/neighbourhood-crime-rates/"
            criToggle = true; medianToggle = 2; normalChange = 0; svg.selectAll("text#buttonMedian").text("View Percentage Change Over Time");
        }
        if (category[0] === "crimeBandE") {
            criCat = "BREAKENTER_RATE_"
            document.getElementById("catTitle").textContent = "Breaking and Entering Rate" + criYearString
            document.getElementById("catDesc").textContent = "Number of breaking and enters that occur in neighbourhood per 100,000 residents."
            if (ageSlider1 !== ageSlider2) {
                document.getElementById("catDesc").textContent = "Average n" + document.getElementById("catDesc").textContent.slice(1, - 1) + " per year."
            }
            dataSource = "https://open.toronto.ca/dataset/neighbourhood-crime-rates/"
            criToggle = true; medianToggle = 2; normalChange = 0; svg.selectAll("text#buttonMedian").text("View Percentage Change Over Time");
        }
        if (category[0] === "crimeHomicide") {
            criCat = "HOMICIDE_RATE_"
            document.getElementById("catTitle").textContent = "Homicide Rate" + criYearString
            document.getElementById("catDesc").textContent = "Number of homicides that occur in neighbourhood per 100,000 residents."
            if (ageSlider1 !== ageSlider2) {
                document.getElementById("catDesc").textContent = "Average n" + document.getElementById("catDesc").textContent.slice(1, - 1) + " per year."
            }
            dataSource = "https://open.toronto.ca/dataset/neighbourhood-crime-rates/"
            criToggle = true; medianToggle = 2; normalChange = 0; svg.selectAll("text#buttonMedian").text("View Percentage Change Over Time");
        }
        if (category[0] === "crimeRobbery") {
            criCat = "ROBBERY_RATE_"
            document.getElementById("catTitle").textContent = "Robbery Rate" + criYearString
            document.getElementById("catDesc").textContent = "Number of robberies that occur in neighbourhood per 100,000 residents."
            if (ageSlider1 !== ageSlider2) {
                document.getElementById("catDesc").textContent = "Average n" + document.getElementById("catDesc").textContent.slice(1, - 1) + " per year."
            }
            dataSource = "https://open.toronto.ca/dataset/neighbourhood-crime-rates/"
            criToggle = true; medianToggle = 2; normalChange = 0; svg.selectAll("text#buttonMedian").text("View Percentage Change Over Time");
        }
        if (category[0] === "crimeShooting") {
            criCat = "SHOOTING_RATE_"
            document.getElementById("catTitle").textContent = "Shooting Rate" + criYearString
            document.getElementById("catDesc").textContent = "Number of shootings that occur in neighbourhood per 100,000 residents."
            if (ageSlider1 !== ageSlider2) {
                document.getElementById("catDesc").textContent = "Average n" + document.getElementById("catDesc").textContent.slice(1, - 1) + " per year."
            }
            dataSource = "https://open.toronto.ca/dataset/neighbourhood-crime-rates/"
            criToggle = true; medianToggle = 2; normalChange = 0; svg.selectAll("text#buttonMedian").text("View Percentage Change Over Time");
        }
        if (category[0] === "crimeTheftMV") {
            criCat = "THEFTFROMMV_RATE_"
            document.getElementById("catTitle").textContent = "Theft From Motor Vehicles" + criYearString
            document.getElementById("catDesc").textContent = "Number of thefts from a motor vehicle that occur in neighbourhood per 100,000 residents."
            if (ageSlider1 !== ageSlider2) {
                document.getElementById("catDesc").textContent = "Average n" + document.getElementById("catDesc").textContent.slice(1, - 1) + " per year."
            }
            dataSource = "https://open.toronto.ca/dataset/neighbourhood-crime-rates/"
            criToggle = true; medianToggle = 2; normalChange = 0; svg.selectAll("text#buttonMedian").text("View Percentage Change Over Time");
        }
        if (category[0] === "crimeTheft") {
            criCat = "THEFTOVER_RATE_"
            document.getElementById("catTitle").textContent = "Theft Over $5000s" + criYearString
            document.getElementById("catDesc").textContent = "Number of thefts over $5000 that occur in neighbourhood per 100,000 residents."
            if (ageSlider1 !== ageSlider2) {
                document.getElementById("catDesc").textContent = "Average n" + document.getElementById("catDesc").textContent.slice(1, - 1) + " per year."
            }
            dataSource = "https://open.toronto.ca/dataset/neighbourhood-crime-rates/"
            criToggle = true; medianToggle = 2; normalChange = 0; svg.selectAll("text#buttonMedian").text("View Percentage Change Over Time");
        }
        if (category[0] === "Im") {
            document.getElementById("catTitle").textContent = "Immigration Rate"
            document.getElementById("catDesc").textContent = "Percentage of residents in neighbourhood who came to Canada as immigrants."
            if (ageSlider1 !== ageSlider2) {
                document.getElementById("catDesc").textContent = "Average n" + document.getElementById("catDesc").textContent.slice(1, - 1) + " per year."
            }
            dataSource = "https://open.toronto.ca/dataset/neighbourhood-crime-rates/"
            criToggle = false; medianToggle = 2; normalChange = 0; svg.selectAll("text#buttonMedian").text("View Percentage Change Over Time");
        }
        if (category[0] === "crisisOD") {
            criCat = "OVERDOSE_"
            document.getElementById("catTitle").textContent = "Overdose Call Rate" + criYearString
            document.getElementById("catDesc").textContent = "Number of overdose related calls attended by an officer of the TPS in each neighbourhood per 100,000 residents."
            if (ageSlider1 !== ageSlider2) {
                document.getElementById("catDesc").textContent = "Average n" + document.getElementById("catDesc").textContent.slice(1, - 1) + " per year."
            }
            dataSource = "https://open.toronto.ca/dataset/persons-in-crisis-calls-for-service-attended/"
            criToggle = true; medianToggle = 2; normalChange = 0; svg.selectAll("text#buttonMedian").text("View Percentage Change Over Time");
        }
        if (category[0] === "crisisSuicide") {
            criCat = "SUICIDE_"
            document.getElementById("catTitle").textContent = "Suicide Call Rate" + criYearString
            document.getElementById("catDesc").textContent = "Number of suicide related calls attended by an officer of the TPS in each neighbourhood per 100,000 residents."
            if (ageSlider1 !== ageSlider2) {
                document.getElementById("catDesc").textContent = "Average n" + document.getElementById("catDesc").textContent.slice(1, - 1) + " per year."
            }
            dataSource = "https://open.toronto.ca/dataset/persons-in-crisis-calls-for-service-attended/"
            criToggle = true; medianToggle = 2; normalChange = 0; svg.selectAll("text#buttonMedian").text("View Percentage Change Over Time");
        }
        if (category[0] === "crisisCrisis") {
            criCat = "CRISIS_"
            document.getElementById("catTitle").textContent = "Person in Crisis Calls" + criYearString
            document.getElementById("catDesc").textContent = "Number of crisis calls attended by an officer of the TPS in each neighbourhood per 100,000 residents."
            if (ageSlider1 !== ageSlider2) {
                document.getElementById("catDesc").textContent = "Average n" + document.getElementById("catDesc").textContent.slice(1, - 1) + " per year."
            }
            dataSource = "https://open.toronto.ca/dataset/persons-in-crisis-calls-for-service-attended/"
            criToggle = true; medianToggle = 2; normalChange = 0; svg.selectAll("text#buttonMedian").text("View Percentage Change Over Time");
        }
        if (category[0] === "totPop") {
            criCat = "POPULATION_"
            document.getElementById("catTitle").textContent = "Total Neighbourhood Population" + criYearString
            document.getElementById("catDesc").textContent = "Total Population in neighbourhood."
            if (ageSlider1 !== ageSlider2) {
                document.getElementById("catDesc").textContent = "Average n" + document.getElementById("catDesc").textContent.slice(1, - 1) + " per year."
            }
            dataSource = "https://open.toronto.ca/dataset/neighbourhood-crime-rates/"
            criToggle = true; medianToggle = 2; normalChange = 0; svg.selectAll("text#buttonMedian").text("View Percentage Change Over Time");
        }

        titleCheck = document.getElementById("catTitle").textContent;

        
    }

    function graphPoints(name, row, par) {

        var start = 2014
        var end = 2023
        var arr = []

        while (start <= end) {
            arr.push(row[name + start])
            start = start + 1
        }
        //var max = Math.max(...arr)
        if (name === "ASSAULT_RATE_") {var max = 3500;}
        if (name === "AUTOTHEFT_RATE_") {var max = 1700;}
        if (name === "BIKETHEFT_RATE_") {var max = 1000;}
        if (name === "BREAKENTER_RATE_") {var max = 700;}
        if (name === "HOMICIDE_RATE_") {var max = 20;}
        if (name === "ROBBERY_RATE_") {var max = 700;}
        if (name === "SHOOTING_RATE_") {var max = 50;}
        if (name === "THEFTFROMMV_RATE_") {var max = 2500;}
        if (name === "THEFTOVER_RATE_") {var max = 300;}
        if (name === "OVERDOSE_") {var max = 3500;}
        if (name === "SUICIDE_") {var max = 1800;}
        if (name === "CRISIS_") {var max = 3500;}
        if (name === "POPULATION_") {if (par.startsWith("mouseover")) {var max = 35000} else {var max = 2500000;}}
        arr = arr.map(function(element) {
            return (element / max) * 100;
        });

        return [arr,max]
    }

    function graphCoordinates(arr) {
        var len = arr.length

        var start = 0

        var newArr = [];

        newArr.push([60,220 - arr[start]])
        
        while (start < len) {
            newArr.push([start * 36 + 76, 220 - arr[start]])
            start = start + 1
        }

        return newArr;
    }

    function generateColorGradient(startColor, endColor, n) {
    // Parse input colors
    var startRGB = d3.rgb(startColor);
    var endRGB = d3.rgb(endColor);

    // Calculate color step
    var step = 1 / (n - 1);

    // Generate the color gradient array
    var colorGradient = Array.from({ length: n }, function(_, i) {
        var t = i * step;
        return d3.rgb(
        Math.round(startRGB.r + t * (endRGB.r - startRGB.r)),
        Math.round(startRGB.g + t * (endRGB.g - startRGB.g)),
        Math.round(startRGB.b + t * (endRGB.b - startRGB.b))
        );
    });

    return colorGradient;
    }

    function ageSum(start,end) {
    var arr = []

    if (0 >= start && 0 <= end) { arr.push("1a0to4")};
    if (1 >= start && 1 <= end) { arr.push("1a5to9")};
    if (2 >= start && 2 <= end) { arr.push("1a10to14")};
    if (3 >= start && 3 <= end) { arr.push("1a15to19")};
    if (4 >= start && 4 <= end) { arr.push("1a20to24")};
    if (5 >= start && 5 <= end) { arr.push("1a25to29")};
    if (6 >= start && 6 <= end) { arr.push("1a30to34")};
    if (7 >= start && 7 <= end) { arr.push("1a35to39")};
    if (8 >= start && 8 <= end) { arr.push("1a40to44")};
    if (9 >= start && 9 <= end) { arr.push("1a45to49")};
    if (10 >= start && 10 <= end) { arr.push("1a50to54")};
    if (11 >= start && 11 <= end) { arr.push("1a55to59")};
    if (12 >= start && 12 <= end) { arr.push("1a60to64")};
    if (13 >= start && 13 <= end) { arr.push("1a65to69")};
    if (14 >= start && 14 <= end) { arr.push("1a70to74")};
    if (15 >= start && 15 <= end) { arr.push("1a75to79")};
    if (16 >= start && 16 <= end) { arr.push("1a80to84")};
    if (17 >= start && 17 <= end) { arr.push("1a85to89")};
    if (18 >= start && 18 <= end) { arr.push("1a90to94")};
    if (19 >= start && 19 <= end) { arr.push("1a95to99")};
    if (20 >= start && 20 <= end) { arr.push("1a100to")};

    return arr;
    }

    function animateRect(elementId) {
        var element = document.getElementById(elementId + "Rect");
    
        function frame() {
          var currentPosition = parseInt(element.style.width) || 0;
    
          if (currentPosition < 250) {
            currentPosition += 20; // Adjust the speed of the animation
            element.style.width = currentPosition + 'px';
            requestAnimationFrame(frame);
          }
        }
    
        frame(); // Start the animation
      }

    function setEmCorrect() {
        var elements = document.querySelectorAll('.menuTopLabel');
            elements.forEach(function(element) {
                element.style.marginBlockEnd = '1em';
            });
        var Aelements = document.querySelectorAll('.arrow-icon');
            Aelements.forEach(function(Aelement) {
                Aelement.style.top = '-2px';
            });
        }

    function getColorBasedOnCondition(condition) {
        return condition ? "green" : "red";
        }

    function reset() {
            d3.select(".wrapper").select("svg").select("path#graph").remove()
            d3.select(".wrapper").select("svg").selectAll("circle#graph").remove()

            if (order == "equal") {
                order = "linear"
                d3.select("body").selectAll("text#button").text("Switch to Percentile")
                toggleCheckbox1.checked = false
            }

            if (averageMedian == 1) {
                changeVariable([displayCat.slice(0, -1),category[1]])
            }

            if (medianToggle == true) {
                averageMedian = 0
                d3.select("body").selectAll("text#buttonMedian").text("Switch to Median")
                toggleCheckbox2.checked = false
            }

            if (medianToggle == 2) {
                normalChange = 0
                d3.select("body").selectAll("text#buttonMedian").text("View Percentage Change Over Time")
                toggleCheckbox2.checked = false
                // changeVariable([category[0].slice(0, -1),category[1]])
            }

        }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function wait() {
            await delay(2000);
    }

    function toggleDropdown(set) {
        var dropdownOptions = document.getElementById("yearSelect");
        var text = document.getElementById("comYearText");
        if (set == "on" && medianToggle == 2) {
            dropdownOptions.style.display = "block"
            text.style.display = "flex"
        }
        if (set == "off") {
            dropdownOptions.style.display = "none"
            text.style.display = "none"
        }
      }
