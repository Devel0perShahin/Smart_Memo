// console.log("Welcome to smart note")

let body = document.querySelector("body");
let Section = document.querySelectorAll("main section");
let Cro = document.querySelectorAll("main .Cro");
let Description = document.querySelectorAll("main .Description");
let Pieces = document.querySelectorAll("main .Pieces");
let Price = document.querySelectorAll("main .Price");
let Total_col = document.querySelectorAll("main .Total");

let Cro_no = 0;

// Create_append function
function Cre_and_append(Element_name, Append_el, ...El_class) {
    let Out_el_name = document.createElement(Element_name); Append_el.appendChild(Out_el_name).classList.add(...El_class);

}
// Cre_and_append("h1", body);



/////////////////////////////////////////////////////
/////////// CREATE DYNAMICALLY ELEMENTS /////////////
body.addEventListener("dblclick", () => {
    // console.log("dbl click success")
    //-------- CROMIC NONG -----------//
    Cro_no = Cro_no + 1;
    // Cro = document.querySelectorAll("main div.Cro");

    Cre_and_append("span", Section[0], "Cro");
    Cro = document.querySelectorAll("main .Cro");
    // console.log(Cro[Cro_no])

    Cro[Cro_no].innerText = Cro_no + 1;
    //-------- -------------- -----------//
    //-------- DESCRIPTION -----------//

    Cre_and_append("textarea", Section[1], "Dynamic_row");

    //-------- ------------ -----------//
    //-------- PIECE -----------//

    Cre_and_append("input", Section[2], "Pieces", "Dynamic_row");
    //-------- ------------ -----------//
    //-------- PRICE -----------//

    Cre_and_append("input", Section[3], "Price", "Dynamic_row");

    //-------- ------------ -----------//
    //-------- TOTAL -----------//

    Cre_and_append("span", Section[4], "Total");
    //-------- ------------ -----------//
})


//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
////////// MAKE AUTO ADJUST HEIGHT ////////

let Scroll_height;

body.addEventListener("click", () => {

    let Textarea_arr = document.querySelectorAll("main textarea.Dynamic_row");
    Textarea_arr = Array.from(Textarea_arr);
    let Cro_arr = document.querySelectorAll("main .Cro");
    Cro_arr = Array.from(Cro_arr);
    let Description_arr = document.querySelectorAll("main textarea");
    Description_arr = Array.from(Description_arr);
    let Pieces_arr = document.querySelectorAll("main .Pieces");
    Pieces_arr = Array.from(Pieces_arr);
    let Price_arr = document.querySelectorAll("main .Price");
    Price_arr = Array.from(Price_arr);
    let Total_arr = document.querySelectorAll("main .Total");
    Total_arr = Array.from(Total_arr);


    Textarea_arr.forEach(Element => {
        // console.log(Element)
        Element.addEventListener("keyup", e => {
            // console.log(Element);

            Scroll_height = (e.target.scrollHeight) //INITIALIZE T.AREA HEIGHT
            // console.log(Scroll_height)
            let Cromic_of_row = Textarea_arr.indexOf(Element) // INITIALIZE CROMIC OF LINES
            // console.log(Cromic_of_row)

            //SET DYNAMIC HEIGHT
            console.log(Description_arr[Cromic_of_row].value);

            if (Description_arr[Cromic_of_row].value != "") {
                Cro_arr[Cromic_of_row].style.height = `${Scroll_height}px`;
                Description_arr[Cromic_of_row].style.height = `${Scroll_height}px`;
                Pieces_arr[Cromic_of_row].style.height = `${Scroll_height}px`;
                Price_arr[Cromic_of_row].style.height = `${Scroll_height}px`;
                Total_arr[Cromic_of_row].style.height = `${Scroll_height}px`;
            } else {
                console.log("hello")
            }
        })
    })

    // //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\///////////////
    // ////////// MAKE SURE (PIECES * PRICE = TOTAL) ////////

    var New_arr = [];
    let Total_of_totals_value;
    let Total_of_totals_dis;


    function Total_cal(Element, Arr_cro) {
        Element.addEventListener("keyup", () => {

            // console.log(Element)
            let Price_row_no = Arr_cro.indexOf(Element);

            // console.log(Price_row_no)
            let Price = Number(Price_arr[Price_row_no].value);
            let Piece = Number(Pieces_arr[Price_row_no].value)
            let Total = Piece * Price;
            Total = Total.toLocaleString("en-US");
            Total_arr[Price_row_no].innerText = Total

            New_arr = [];
            for (let b of Total_arr) {
                b = b.innerText;
                b = Number(b.replace(/,/g, ''))
                New_arr.push(b)
                Total_of_totals_value = New_arr.reduce((acc, val) => {
                    return acc + val;
                }, 0)
            }

            // console.log(Total_of_totals_value)
            Total_of_totals_dis = document.querySelector(".Number_div > .Total_of_totals");

            Total_of_totals_value = Total_of_totals_value.toLocaleString("en-US");
            // console.log(Total_of_totals_value)

            Total_of_totals_dis.innerText = Total_of_totals_value;
            if (Total_of_totals_dis.innerText == "0") {
                Total_of_totals_dis.innerText = "0000";
            }
        })

    }


    // //==== WORK ON PIECE =======//
    Pieces_arr.forEach(Element => {
        Total_cal(Element, Pieces_arr);
    })
    // //================= =============== =========//
    // //========= WORK ON PRICE =========//


    Price_arr.forEach(Element => {
        Total_cal(Element, Price_arr);
    })

})