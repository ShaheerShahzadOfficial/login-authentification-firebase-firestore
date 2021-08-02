// main javascript
var emailEl = document.getElementById('email');
var passwordEl = document.getElementById('password');
var usernameEl = document.getElementById('username');
var errorvalue = document.getElementById("error")
let db = firebase.firestore();


function register() {

    firebase.auth().createUserWithEmailAndPassword(emailEl.value, passwordEl.value)

    .then((userCredential) => {
            // window.location = "./login.html";

            // Signed in 
            var user = userCredential.user;
            console.log(user, userCredential);
            // var dataToSave = {
            //     email: emailEl.value,
            //     userName: usernameEl.value,
            //     password: passwordEl.value,
            //     UID: user.uid
            // }

            function saveUserInFirestore() {
                // var user = userCredential.user;
                // console.log(user, userCredential);
                db.collection("users").add({
                        email: emailEl.value,
                        userName: usernameEl.value,
                        password: passwordEl.value,
                        UID: user.uid
                    })
                    .then(() => {
                        console.log("Document written with ID: ", user.id);


                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
            }
            saveUserInFirestore();

            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var errorvalue = document.getElementById("error")
            errorvalue.innerHTML = error
        });

}














// db.collection('users').doc(userToSave.uid).setAttribute(userToSave)


//     var cityRef = db.collection('cities').doc('BJ');

//     var setWithMerge = cityRef.set({
//         capital: true
//     }, { merge: true })

//     .then(()=>{
//     errorvalue.innerHTML="user is saved in database"
// })
// .catch((error) => {
//     errorvalue.innerHTML="Error writing document: "+ error;
// });




// Add a new document with a generated id.







function login() {
    firebase.auth().signInWithEmailAndPassword(emailEl.value, passwordEl.value)
        .then((userCredential) => {
            console.log(userCredential);
            window.location = "./home.html";
            // saveUserInFirestore();
        })
        .catch((error) => {
            var errorvalue = document.getElementById("error")
            errorvalue.innerHTML = error
        })

}



firebase.auth().onAuthStateChanged((user) => {
    console.log(user, '*********************');
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User

        fetchUsers();
        // ...
    } else {
        // User is signed out
        // ...

    }
});



function signout() {
    firebase.auth().signOut()
        .then(() => {
            window.location = './index.html';
        })

}




function sendPasswordResetEmail() {
    var emailAddress = emailEl.value;
    firebase.auth().sendPasswordResetEmail(emailAddress)
        .then(() => {
            errorvalue.innerHTML = 'email sent';
            // Password reset email sent!
            // ..
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            errorvalue.innerHTML = error
        });
}



function fetchUsers() {
    var uid = firebase.auth().currentUser.uid;

    errorvalue.innerHTML(uid)
        // var docRef = db.collection("users").doc(uid);
        // docRef.get()
        //     .then((doc) => {
        //         if (doc.exists) {
        //             console.log("Document data:", doc.data(), doc.id);
        //         } else {
        //             // doc.data() will be undefined in this case
        //             console.log("No such document!");
        //         }
        //     })
        //     .catch((error) => {
        //         console.log("Error getting document:", error);
        //     });


    //  //fetching user data from  firestore 

    // var docRef = db.collection("users");
    // docRef.get()
    //     .then((usersSnapshot) => {
    //         usersSnapshot.forEach((userDoc) => {
    //             console.log(userDoc.data(), '*************', userDoc.id);
    //         });

    //     })
    //     .catch((error) => {
    //         console.log("Error getting document:", error);
    //     });














}