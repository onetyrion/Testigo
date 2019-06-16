import { database } from "../Services/Firebase";

function busca_user() {    
    var db = database;
    var ref = db.ref("usuarios");
    ref.orderByChild("email").on("child_added", function(snapshot){
      var d = snapshot.val();        
         console.log(d);     
    });
     
    }
busca_user();