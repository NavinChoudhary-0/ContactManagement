const express = require("express");
const bodyParser = require("body-parser");
var router = express.Router();
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));/////to addd css to our home page

mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true });////connecting mongoose
/////////////here we have connected mongoose sever and created the database todolistDB

const itemsSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    mobileno: String,
    //////////////////////////////////////////////////////////////

    middlename: String,
    date: String,
    whatsappno: String,
    address: String,
    village: String,
    district: String,
    pincode: String,
    landlineNo: String,
    landlineNo2: String,
    mobileno2: String,
    email: String,
    country: String,
    state: String,

    /////////////////////////Professional Info////////////////////////////////////

    Orgaization: String,
    Designation: String,
    Department: String,
    LLNumb: String,
    LLNumb2: String,
    MNumber: String,
    MNumber2: String,
    Pemail: String,
    Email2: String,
    FNumber: String,
    Website: String,
    Ofaddress: String,
    city: String,
    Pdistrict: String,
    Ppincode: String,
    Pcountry: String,
    Pstate: String,
    Planguage: String,
    Pcategory: String,
    PInterestarea: String

}, { typeKey: '$type' });
////creating and defining the itemschema  

const Item = mongoose.model("Item", itemsSchema); ///collection creation
////here above we have created a collection inside the database todolistDB 

const item1 = new Item({
    firstname: "tejas",
    lastname: "peshwe",
    mobileno: 9021618368
});

const defaultItems = [item1];

app.get("/", function (req, res) {

    console.log("home /");

    Item.find({}, function (err, foundItems) {

        // console.log(foundItems);
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Success items saved to db");
                }
            });
            res.redirect("/");
        }
        else {
            res.render("list", { listTitle: "user t sys", newListItems: foundItems })
        }

    })

    // res.send("hello");
    // Item.insertOne()


    // res.render("list" , {listTitle: "UserMgmtSys"});
});


app.post("/", function (req, res) {
    console.log("home /");

    const itemfirstname = req.body.fname;
    const itemlasttname = req.body.lname;

    const itemmiddlename = req.body.middlename;

    const itemdate = req.body.date;
    const itemwhatsappno = req.body.Wnumber;
    const itemaddres = req.body.address;
    const itemvillage = req.body.village;
    const itemdistrict = req.body.district;
    const itempincode = req.body.pincode;

    const itemlandline = req.body.LLNumb;
    const itemlandline2 = req.body.LLNumb2;

    const itemmobileno = req.body.MNumber;
    const itemmobileno2 = req.body.MNumber2;

    const itememail = req.body.email;
    const itemcountry = req.body.country;
    const itemstate = req.body.state;

    /////////////////////////////////////////////////////////////

    const itemOrganization = req.body.POrgaization;
    const itemDesignation = req.body.PDesignation;
    const itemDepartment = req.body.PDepartment;
    const itemLLNumb = req.body.PLLNumb;
    const itemLLNumb2 = req.body.PLLNumb2;
    const itemMNumber = req.body.PMNumber;
    const itemMNumber2 = req.body.PMNumber2;
    const itemPEmail = req.body.PEmail;
    const itemPEmail2 = req.body.PEmail2;
    const itemPFNumber = req.body.PFNumber;
    const itemPWebsite = req.body.PWebsite;
    const itemPOfaddress = req.body.POfaddress;
    const itemPcity = req.body.Pcity;
    const itemPdistrict = req.body.Pdistrict;
    const itemPpincode = req.body.Ppincode;
    const itemPcountry = req.body.Pcountry;
    const itemPState = req.body.PState;
    const itemPlanguage = req.body.Planguage;
    const itemPcategory = req.body.Pcategory;
    const itemPinterestarea = req.body.Pinterestarea;


    const item = new Item({

        firstname: itemfirstname,
        lastname: itemlasttname,
        mobileno: itemmobileno,
        middlename: itemmiddlename,
        date: itemdate,
        whatsappno: itemwhatsappno,
        address: itemaddres,
        village: itemvillage,
        district: itemdistrict,
        pincode: itempincode,
        landlineNo: itemlandline,
        landlineNo2: itemlandline2,
        mobileno2: itemmobileno2,
        email: itememail,
        country: itemcountry,
        state: itemstate,

        /////////////////////////////////////////////////////////////

        Orgaization : itemOrganization,
        Department: itemDepartment,
        Designation: itemDesignation,
        LLNumb: itemLLNumb,
        LLNumb2: itemLLNumb2,
        MNumber: itemMNumber,
        MNumber2: itemMNumber2,
        Pemail: itemPEmail,
        Email2: itemPEmail2,
        FNumber: itemPFNumber,
        Website: itemPWebsite,
        Ofaddress: itemPOfaddress,
        city: itemPcity,
        Pdistrict: itemPdistrict,
        Ppincode: itemPpincode,
        Pcountry: itemPcountry,
        Pstate: itemPState,
        Planguage: itemPlanguage,
        Pcategory: itemPcategory,

        PInterestarea: itemPinterestarea


    });


    item.save();

    res.redirect("/");
    // res.send("hello");
})

app.post("/delete", function (req, res) {

    const checkeditem = req.body.checkboxitem;
    console.log("id is" + checkeditem);

    Item.findByIdAndRemove(checkeditem, function (err) {
        if (!err) {
            console.log("successfuly deleted");
            res.redirect("/");
        }
        else {
            console.log(err);
            console.log("successfuly deleted");
        }
    });
});



app.post("/viewdetails", function (req, res) {

    const checkeditem = req.body.checkboxitem;
    console.log(checkeditem);
    console.log(checkeditem);

    // var fname = checkeditem;


    Item.findById(checkeditem, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Result : ", docs);
            console.log(docs.firstname);
            // res.render("about" , {FirstName: docs.firstname , LastName:docs.lastname});

            res.render("about", 
            { 
                FirstName : docs.firstname,
                LastName: docs.lastname,
                mobileno :docs.mobileno,            
                middlename: docs.middlename,
                date: docs.date,
                whatsappno: docs.whatsappno,
                address: docs.address,
                village: docs.village,
                district: docs.district,
                pincode: docs.pincode,
                landlineNo: docs.landline,
                landlineNo2: docs.landline2,
                mobileno2: docs.mobileno2,
                email: docs.email,
                country: docs.country,
                state: docs.state, 
                
                
                Orgaization : docs.Orgaization,
                Department: docs.Department,
                Designation: docs.Designation,
                LLNumb: docs.LLNumb,
                LLNumb2: docs.LLNumb2,
                MNumber: docs.MNumber,
                MNumber2: docs.MNumber2,
                Pemail: docs.Pemail,
                Email2: docs.Email2,
                FNumber: docs.FNumber,
                Website: docs.Website,
                Ofaddress: docs.Ofaddress,
                city: docs.city,
                Pdistrict: docs.Pdistrict,
                Ppincode: docs.Ppincode,
                Pcountry: docs.Pcountry,
                Pstate: docs.Pstate,
                Planguage: docs.Planguage,
                Pcategory: docs.Pcategory,
                PInterestarea: docs.PInterestarea            
            });

        }
    })




})


app.post("/search" , function(req,res)
{
    console.log("Search------");
    const firstnameSearch = req.body.firstnameSearch;

    const lastnameSearch = req.body.LastnameSearch;

    console.log(firstnameSearch);
    console.log(lastnameSearch);

    Item.find({firstname: firstnameSearch },{lastname: lastnameSearch} , function(err, searchDocs){
            if(err){
                console.log(err);
            }
            else{
                console.log("inside else");
                console.log("inside else");

                console.log(searchDocs);

                // res.render("list", { listTitle: "user t sys", searchListItems: searchDocs });

                res.render("search", { listTitle : "Search display", searchListItems : searchDocs });

                // res.redirect("/");
            }
        })
    


    console.log("Search End");
})

app.listen(3000, function (req, res) {
    console.log("server running 3000");
});







