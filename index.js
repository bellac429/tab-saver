let myLeads = [] // stores URL's from tabs/ leads
const inputEl = document.getElementById("input-el") // 
const inputBtn = document.getElementById("input-btn") // text-box to type in a URL
const ulEl = document.getElementById("ul-el") // list of tabs/leads
const deleteBtn = document.getElementById("delete-btn") // deletes leads/tabs
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") ) // get leads/tabs from local storage
const tabBtn = document.getElementById("tab-btn") // gets url from tab

if (leadsFromLocalStorage) { // if there is leads stored in local storage
    myLeads = leadsFromLocalStorage
    render(myLeads) // render current leads
}

// save a url into tab-saver
tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){ // get url of page from web-browser
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) ) // store url in local storage
        render(myLeads) // render new leads
    })
})

// render leads as list elements
function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

// deletes tabs/leads
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

// stores a typed in value from text input box
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})
