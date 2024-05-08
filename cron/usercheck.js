
const Users = require("../models/user");
const Exceljs = require("exceljs");

const CheckNewUsers = async()=>{
    const userData = await Users.findAll();
    const userAddedSummary = userData.filter((one)=>{
        const todayDateTime = new Date().toISOString();
        const userCreationDate =one.createdAt.toISOString();
        let userDate = userCreationDate.split("T")[0];
        let todate = todayDateTime.split("T")[0];
        if(userDate === todate){
            return {
                name: one.name,
                email:one.email,
                createdAt: one.createdAt
            };
        }else{
            return "No User Created Today";
        }
    });
    console.log("Inside the Summary Creation",userAddedSummary.length);
     if(userAddedSummary.length != 0){
        const workbook = new Exceljs.Workbook();
        const worksheet = workbook.addWorksheet("User Created Today");
        worksheet.column =[
            {header:"Name",key:"name",width:"20"},
            {header:"Email",key:"email",width:"60"},
            {header:"Created At",key:"createdAt",width:"60"}
        ];
        userAddedSummary.forEach((user)=>{
            worksheet.addRow(user);
        });
        workbook.xlsx.writeFile('user_summary.xlsx')
        .then(()=>{
            console.log("Excelfile create successfully");
        }).catch(err => {
            console.error('Error writing Excel file:', err);
        });

     }else{
        console.log("No user added today");
     }
   
}



module.exports=CheckNewUsers;

