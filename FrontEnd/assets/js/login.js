// // Fonction pour effectuer la connexion (simulée ici)
// function performLogin(username, password) {
//   // Remplacez cette partie par votre logique de connexion réelle
//   return new Promise((resolve, reject) => {
//     // Supposons que le nom d'utilisateur est "admin" et le mot de passe est "12345"
//     if (email === "admin" && password === "12345") {
//       resolve({ message: "Connexion réussie !" });
//     } else {
//       reject({ message: "Nom d'utilisateur ou mot de passe incorrect." });
//     }
//   });
// }




// Sélectionner le formulaire et ajouter un gestionnaire d'événement pour la soumission
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Empêche l'envoi du formulaire par défaut

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  // Vérifier les champs
  if (email === '') {
    alert("Veuillez saisir une adresse e-mail.");
    return false; // Empêcher la soumission du formulaire si le champ est vide
  } else if (!emailRegex.test(email)) {
    alert("Veuillez saisir une adresse e-mail valide.");
    return false; // Empêcher la soumission du formulaire si l'adresse e-mail est invalide
  }

  // Vérification du champ "password"
  if (password === '') {
    alert("Veuillez saisir un mot de passe.");
    return false; // Empêcher la soumission du formulaire si le champ est vide
  }

  // Si tout est correct, le formulaire peut être soumis
  // return true; <- Vous pouvez retirer cette ligne, car il n'est pas nécessaire de retourner true ici

  // Envoi de la requête de connexion au serveur
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email, password: password })
  })
  .then((response) => response.json())
  .then((data) => {
    // Le serveur a renvoyé une réponse au format JSON, nous pouvons accéder aux données ici
    if (data.userFound) {
      // L'utilisateur a été trouvé, enregistrez le jeton dans le stockage local
      localStorage.setItem('token', data.token);

      // Vérifiez si l'utilisateur est un administrateur et activez le mode administrateur si c'est le cas
      if (isAdmin()) {
        activerModeAdministrateur();
      }

      // Redirigez vers la page d'accueil (ou toute autre page appropriée)
      window.location.href = '/accueil'; // Remplacez '/accueil' par l'URL de votre page d'accueil
    } else {
      // L'utilisateur n'a pas été trouvé, affichez un message d'erreur ou effectuez une autre action appropriée
      console.log('Utilisateur non trouvé.');
    }
  })
  .catch((error) => console.log(error));
});

// Fonction pour vérifier si le token est présent dans le Local Storage et s'il correspond à un administrateur
function isAdmin() {
  const token = localStorage.getItem('token');
  // Remplacez cette condition par celle que vous utilisez pour vérifier si le token est celui d'un administrateur
  return token !== null && token === 'votre_token_admin'; // Vérifiez si le token est celui d'un administrateur
}

// Fonction pour activer le mode administrateur
function activerModeAdministrateur() {
  // Mettez ici le code pour activer le mode administrateur, par exemple en affichant des fonctionnalités supplémentaires ou en modifiant l'apparence de l'interface.
  console.log('Mode administrateur activé.');
}



//   // Appeler la fonction de connexion avec les informations d'identification
//   performLogin(username, password)
//     .then((response) => {
//       alert(response.message); // Connexion réussie, affichez un message approprié
      
//       // Supposons que vous avez un jeton d'authentification généré par votre serveur
//       const authToken = "votre_token_d_authentification"; // Remplacez-le par votre jeton réel

//       // Stocker le token dans le localStorage
//       storeToken(authToken);

//       // Vous pouvez rediriger l'utilisateur vers une autre page ici
//       // window.location.href = "page_de_destination.html";
//     })
//     .catch((error) => {
//       alert(error.message); // Affichez un message d'erreur en cas d'échec de connexion
//     });
// });

// // Récupérer le token du localStorage (peut être fait à n'importe quel moment dans votre script)
// const storedToken = localStorage.getItem("userToken");
// console.log(storedToken); // Vous pouvez utiliser le token récupéré pour vos actions ultérieure)
