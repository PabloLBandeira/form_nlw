const app = document.getElementById("app")
const users = [
  {
    email: "tast@teste.com",
    phone: "00123456789",
    ref: 1,
    refBy: null
  },
  {
    email: "test@teste.com",
    phone: "00123456788",
    ref: 2,
    refBy: 1
  },
  {
    email: "tist@teste.com",
    phone: "00123456787",
    ref: 3,
    refBy: 1
  },
  {
    email: "tost@teste.com",
    phone: "00123456786",
    ref: 4,
    refBy: 2
  }
]

const getUser = (userData) => {
  return users.find((user) => {
    return user.email == userData.email
  })
}

const getTotalSubscribes = (userData) => {
  const subs = users.filter((user) => {
    return user.refBy == userData.ref
  })
  return subs.length
}

const showInvite = (userData) => {
  app.innerHTML = `
<main>
  <h3>Inscriação confirmada!</h3>
  <p>Convide mais pessoas e concorra a prêmios! <br>
  Compartilhe o link e acompanhe as inscrições:</p>

    <div class="input-group">
      <label for="link">
        <img src="link.svg" alt="Link icon">
      </label>
      <input type="text" id="link" value="http://evento.com.br?ref=${userData.ref}" disabled />
    </div>

</main>

<section class="stats">
  <h4>${getTotalSubscribes(userData)}</h4>
  <p>Inscrições realizadas</p>

</section>
`
app.setAttribute("class", "invite")
updateImagesLinks()
}

const saveUser = (userData) => {
  const newUser = {
    ...userData,
    ref: users.length + 1,
    refBy: null
  }

  users.push(newUser)
  return newUser
}

const formAction = () => {
  const form = document.getElementById("form")
  form.onsubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(form)
    const userData = {
      email: formData.get("email"),
      phone: formData.get("phone")
    }
    
    const user = getUser(userData)
    if (user) {
      showInvite(user)
    } else {
      const newUser = saveUser(userData)
      showInvite(newUser)
    }
}
}

const updateImagesLinks = () => {
  document.querySelectorAll('img').forEach((img) => {
    const fileName = img.getAttribute("src");
    if(fileName.includes("githubusercontent")) 
      return fileName;
    else 
      img.src = `https://raw.githubusercontent.com/maykbrito/my-public-files/main/nlw-19/${fileName}`;
  });
};


const startApp = () => {
  const content = `
      <main>
        <section class="about">
          
          <div class="section-header">
            <div id="header">
              <h2>Sobre o evento</h2>
              <span class="badge"> AO VIVO</span>
            </div>

            <p>
              Um evento feito por e para pessoas desenvolvedoras apaixonadas por criar soluções inovadoras e compartilhar conhecimento. Vamos mergulhar nas tendências mais recentes em desenvolvimento de software, arquitetura de sistemas e tecnologias emergentes, com palestras, workshops e hackathons.
              <br> <br>
              Dias 15 a 17 de março | Das 18h às 21h | Online & Gratuito 
            </p>
          </div>
        </section>
        <section class="register">
          <h2>Inscrições</h2>

          <form id="form">
            <div class="input-wrapper">
              <div class="input-group">
                <label for="email">
                  <img src="mail.svg" alt="Email Icon">
                </label>
                <input type="email" name="email" id="email" placeholder="Digite seu email" required>
              </div>

              <div class="input-group">
                <label for="phone">
                  <img src="phone.svg" alt="phone Icon">
                </label>
                <input type="text" name="phone" id="phone" placeholder="Digite seu telefone" required>
              </div>

            </div>

            <button>
              Confirmar
              <img src="arrow.svg" alt="Arrow">
            </button>
              
          </form>
        </section>


      </main>
`

app.innerHTML = content
app.setAttribute("class", "page-start")
updateImagesLinks()
formAction()
}

startApp()

document.querySelector("header").onclick = () => {
  startApp()
}