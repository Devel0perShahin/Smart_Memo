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

//SET AUTO ADJUST HEIGHT FUNCTION
function Auto_adjust_height(Textarea_arr, Heightable_El) {
    Textarea_arr.forEach(Element => {
        Element.addEventListener("keyup", (e) => {
            let Index = Textarea_arr.indexOf(Element)
            Heightable_El[Index].style.height = "3.5rem";
            let Scroll_height = e.target.scrollHeight;
            // console.log(scroll_height)
            Heightable_El[Index].style.cssText = `height:${Scroll_height}px`;
        })
    })

}


//ONLY NUMBER INPUT
function Only_number_inp(Input_arr) {
    Input_arr.forEach(Element => {
        Element.addEventListener("keyup", () => {
            if (isNaN(Element.value)) {
                // console.log("It is NaN")
                Element.value = "";
            } else {
                // console.log("It is number")
            }
        })
    })

}

//Calculation_and_show_display function
function Calculation_and_show_display(Selection_arr, Other_arr, Total_arr, Total_display) {

    Selection_arr.forEach(Element => {
        Element.addEventListener("keyup", () => {
            //GET ELEMENT INDEX
            let Index = Selection_arr.indexOf(Element);
            // --------------------------------
            let Selecting_value = Number(Selection_arr[Index].value);
            let Other_value = Number(Other_arr[Index].value);
            let _Total = Selecting_value * Other_value; //INITIALIZE TOTAL
            _Total = _Total.toLocaleString("en-US");
            Total_arr[Index].innerText = _Total;
            // -----------------------------------
            let _Totals_arr = [];
            let _Totals_arr_sum;
            for (let Total of Total_arr) {
                Total = Total.innerText;
                Total = Number(Total.replace(/,/g, ''))
                _Totals_arr.push(Total)
                _Totals_arr_sum = _Totals_arr.reduce((acc, val) => {
                    return acc + val;
                }, 0)
            }

            Total_display.innerText = _Totals_arr_sum.toLocaleString("en-US");

            if (Total_display.innerText == "0") {
                Total_display.innerText = "0000";
            }

        })
    })

}

/////////// CREATE DYNAMICALLY ELEMENTS /////////////
body.addEventListener("dblclick", () => {
    //-------- CROMIC NONG -----------//
    Cro_no = Cro_no + 1;

    Cre_and_append("span", Section[0], "Cro", "Dynamic_row");
    Cro = document.querySelectorAll("main .Cro");
    // console.log(Cro[Cro_no])

    Cro[Cro_no].innerText = Cro_no + 1;

    //-------- DESCRIPTION -----------//
    Cre_and_append("textarea", Section[1], "Dynamic_row");

    //-------- PIECE -----------//
    Cre_and_append("input", Section[2], "Pieces", "Dynamic_row");

    //-------- PRICE -----------//
    Cre_and_append("input", Section[3], "Price", "Dynamic_row");

    //-------- TOTAL -----------//
    Cre_and_append("span", Section[4], "Total", "Dynamic_row");
})


body.addEventListener("click", () => {
    let Textarea_arr = document.querySelectorAll("main textarea");
    Textarea_arr = Array.from(Textarea_arr);
    let Cro_arr = document.querySelectorAll("main span.Cro");
    Cro_arr = Array.from(Cro_arr);
    let Pieces_arr = document.querySelectorAll("main input.Pieces");
    Pieces_arr = Array.from(Pieces_arr);
    let Price_arr = document.querySelectorAll("main .Price");
    Price_arr = Array.from(Price_arr);
    let Total_arr = document.querySelectorAll("main .Total");
    Total_arr = Array.from(Total_arr);
    // ---------------------------------------

    Auto_adjust_height(Textarea_arr, Textarea_arr);
    Auto_adjust_height(Textarea_arr, Cro_arr);
    Auto_adjust_height(Textarea_arr, Pieces_arr);
    Auto_adjust_height(Textarea_arr, Price_arr);
    Auto_adjust_height(Textarea_arr, Total_arr);

    //ONLY NUMBER INPUT
    Only_number_inp(Pieces_arr)
    Only_number_inp(Price_arr)

    // //==== WORK ON PIECE AND TOTAL =======//
    let Total_of_totals_display = document.querySelector(".Total_of_totals_value");
    Calculation_and_show_display(Pieces_arr, Price_arr, Total_arr, Total_of_totals_display)

    // //==== WORK ON PIECE AND TOTAL =======//
    Calculation_and_show_display(Price_arr, Pieces_arr, Total_arr, Total_of_totals_display)

})
