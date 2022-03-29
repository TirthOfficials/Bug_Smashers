var db = openDatabase("itemDB", "1.0", "itemDB", 65535); // itemDB is the database name

      $(function () {
        loadData(); //loading our records

        //CREATING TABLE STARTS HERE

        
          db.transaction(function (transaction) {
            var sql =
              "CREATE TABLE items " +
              "(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
              "name VARCHAR(100) NOT NULL,"+
              "email VARCHAR(100) NOT NULL,"+
              "isOn VARCHAR(100) NOT NULL,"+
              "brand VARCHAR(100) NOT NULL," +
              "processor VARCHAR(100) NOT NULL," +
              "os VARCHAR(100) NOT NULL," +
              "ram VARCHAR(100) NOT NULL,"+
              "rom VARCHAR(100) NOT NULL,"+
              "gen VARCHAR(100) NOT NULL,"+
              "keyboard VARCHAR(100) NOT NULL,"+
              "screen VARCHAR(100) NOT NULL,"+
              "bdy VARCHAR(100) NOT NULL,"+
              "charger VARCHAR(100) NOT NULL)";
            transaction.executeSql(
              sql,
              undefined,
              function () {
                alert("Table is created successfully");
              },
              
            );
          });
        
        // CREATING TABLE ENDS HERE

        //DELETING TABLE STARTS HERE
        $("#remove").click(function () {
          if (!confirm("Are you sure to delete this table?", "")) return;
          db.transaction(function (transaction) {
            var sql = "DROP TABLE items";
            transaction.executeSql(
              sql,
              undefined,
              function () {
                alert("Table is deleted successfully");
              },
              function (transaction, err) {
                alert(err.message);
              }
            );
          });
        });
        //DELETING TABLE ENDS HERE

        //INSERTING DATA INTO TABLE
        //document.addEventListener('click',sendmail())
        $("#insert").click(function () {
          var name=$("#name").val();
          var email=$("#email").val();
          var isOn=$("#isOn").val();
          var brand = $("#brand").val();
          var prc = $("#processor").val();
          var os = $("#os").val();
          var ram = $("#ram").val();
          var rom=$("#rom").val();
          var gen=$("#gen").val();
          var keyboard=$("#keyboard").val();
          var screen=$("#screen").val();
          var bdy=$("#bdy").val();
          var charger=$("#charger").val();
          
          db.transaction(function (transaction) {
            var sql =
              "INSERT INTO items(name,email,isOn,brand,processor,os,ram,rom,gen,keyboard,screen,bdy,charger) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
            transaction.executeSql(
              sql,
              [name, email, isOn, brand, prc, os, ram, rom, gen, keyboard, screen, bdy, charger],
              function () {
                alert("New item is added successfully");
                
              },
              
              function (transaction, err) {
                alert(err.message);
              }
              
            );
            sendmail();
          });
          
        });
        
        //INSERTING DATA ENDS HERE

        //FETCHING OUR RECORD
        // $("#list").click(function () {
        //   loadData();
        // });

        //FUNCTION TO LOAD OUR RECORDS
        
        function loadData() {
          $("#itemlist").children().remove();
          db.transaction(function (transaction) {
            // var sql = "SELECT * FROM items ORDER BY id ASC";
            transaction.executeSql(
              sql,
              undefined,
              function (transaction, result) {
                if (result.rows.length) {
                  for (var i = 0; i < result.rows.length; i++) {
                    var row = result.rows.item(i);
                    var name=row.name;
                    var email=row.email;
                    var isOn=row.isOn;
                    var brand = row.brand;
                    var id = row.id;
                    var processor = row.processor;
                    var os = row.os;
                    var ram = row.ram;
                    var rom=row.rom;
                    var gen=row.gen;
                    var keyboard=row.keyboard;
                    var screen=row.screen;
                    var bdy=row.bdy;
                    var charger=row.charger;
                    
                    $("#itemlist").append(
                      '<tr id="del' +
                        id +
                        '"><td id="newqty">' +
                        id +
                        "</td><td>" +
                        name +
                        '</td><td id="newqty">' +
                        id +
                        "</td><td>" +
                        email +
                        '</td><td id="newqty' +
                        id +
                        '">' +
                        isOn +
                        '</td><td>' +
                        id +
                        "</td><td>" +
                        brand +
                        '</td><td id="newqty' +
                        id +
                        '">' +
                        processor +
                        '</td><td id="newqty' +
                        id +
                        '">' +
                        os +
                        '</td><td id="newqty' +
                        id +
                        '">' +
                        ram +
                        '</td><td id="newqty' +
                        id +
                        '">' +
                        rom +
                        '</td><td id="newqty' +
                        id +
                        '">' +
                        gen +
                        '</td><td id="newqty' +
                        id +
                        '">' +
                        keyboard +
                        '</td><td id="newqty' +
                        id +
                        '">' +
                        screen +
                        '</td><td id="newqty' +
                        id +
                        '">' +
                        bdy +
                        '</td><td id="newqty' +
                        id +
                        '">' +
                        charger +
                        '</td><td><a href="#" class="btn btn-danger deleteitem" data-id="' +
                        id +
                        '">Delete</a> <a href="#" class="btn btn-primary updateitem" data-id="' +
                        id +
                        '">Update</a></td></tr>'
                    );
                  }
                } else {
                  $("#itemlist").append(
                    '<tr><td colspan="3" align="center">No Item Found</td></tr>'
                  );
                }
              },
              function (transaction, err) {
                alert(
                  'No table found. Click on "Create Table" to create table now'
                );
              }
            );
          });

          //setTimeout was used to execute codes inside it to be loaded after records are loaded/fetched.

          setTimeout(function () {
            $(".deleteitem").click(function () {
              var sure = confirm("Are you sure to delete this item?");
              if (sure === true) {
                var id = $(this).data("id");
                db.transaction(function (transaction) {
                  var sql = "DELETE FROM items where id=?";
                  transaction.executeSql(
                    sql,
                    [id],
                    function () {
                      $("#del" + id).fadeOut();
                      alert("Item is deleted successfully");
                    },
                    function (transaction, err) {
                      alert(err.message);
                    }
                  );
                });
              }
            });

            $(".updateitem").click(function () {
              var qty = prompt("Kindly enter new quantity", 1);
              if (qty !== null) {
                var id = $(this).data("id");
                db.transaction(function (transaction) {
                  var sql = "UPDATE items SET quantity=? where id=?";
                  transaction.executeSql(
                    sql,
                    [qty, id],
                    function () {
                      $("#newqty" + id).html(qty);
                      alert("Item is updated successfully");
                    },
                    function (transaction, err) {
                      alert(err.message);
                    }
                  );
                });
              }
            });
          }, 1000);
        }
        //END OF loadData() function
      });