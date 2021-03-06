
      var db = openDatabase("itemDB", "1.0", "itemDB", 65535); // itemDB is the database name

      $(function () {
        loadData(); //loading our records

        //CREATING TABLE STARTS HERE

        
          db.transaction(function (transaction) {
            var sql =
              "CREATE TABLE itemsMobile " +
              "(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
              "name VARCHAR(100) NOT NULL,"+
              "email VARCHAR(100) NOT NULL,"+
              "brand VARCHAR(100) NOT NULL,"+
              "model VARCHAR(100) NOT NULL)";
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
            var sql = "DROP TABLE itemsMobile";
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

        $("#insert").click(function () {
          var name=$("#name").val();
          var email=$("#email").val();
          var brand = $("#brand").val();
          var model=$("#model").val();
          db.transaction(function (transaction) {
            var sql =
              "INSERT INTO itemsMobile(name,email,brand,model) VALUES(?,?,?,?)";
            transaction.executeSql(
              sql,
              [name, email, brand, model],
              function () {
                alert("New item is added successfully");
              },
              function (transaction, err) {
                alert(err.message);
              }
            );
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
            // var sql = "SELECT * FROM itemsMobile ORDER BY id ASC";
            transaction.executeSql(
              sql,
              undefined,
              function (transaction, result) {
                if (result.rows.length) {
                  for (var i = 0; i < result.rows.length; i++) {
                    var row = result.rows.item(i);
                    var name=row.name;
                    var email=row.email;
                    var brand = row.brand;
                    var model=row.model;
                    var id = row.id;
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
                        brand +
                        '</td><td>' +
                        id +
                        "</td><td>" +
                        model +
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
                  var sql = "DELETE FROM itemsMobile where id=?";
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
                  var sql = "UPDATE itemsMobile SET quantity=? where id=?";
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
