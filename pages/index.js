import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSidebar(propriedades) {
  return (
    <Box as = 'aside'>
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`} target="_blank">
          {propriedades.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const githubUser = 'GuilhermeMontez';
  const [comunidades, setComunidades] = React.useState([{
    id: '34234123354576787896890',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }, 
  {
  id: '675674567567456756745',
  title: 'Quem é você na fila do pão?',
  image: 'https://s1.1zoom.me/big3/416/Earth_Black_background_548690_4000x4000.jpg'

  },
  { 
    id: '56756756756546456745674567',
    title: 'Belas paisagens',
    image: 'http://2.bp.blogspot.com/-vCenRrY5x1w/UGcnfSAq5tI/AAAAAAAAFkM/xmLrKj7tLsY/s1600/Imagen+linda+por+do+sol+na+floresta.jpg'
  },
  { 
    id: '2314123412342342341234',
    title: 'Otaku não deveria existir',
    image: 'https://pm1.narvii.com/6364/178c5ed2a8a51d5ddb191e8dd5e5eb0ae8297157_hq.jpg'
  },
  { 
    id: '123156455467456765867',
    title: 'Desenhos que fizeram parte da nossa infância',
    image: 'https://rockfeller.com.br/assets/video-slide/images/image-slider-1.jpg'
  },
  { 
    id: '2343345657456764876869809',
    title: 'Assitindo a evolução',
    image: 'https://www.uu.se/digitalAssets/805/c_805646-l_1-k_image.jpg'
  },
  ]);
  const pessoasFavoritas = [
    'Ewerson2',
    'renelcm',
    'vinivilares',
    'rafaballerini',
    'Peas',
    'felipefialho'
  ]

  const seguidores = fetch('https://api.github.com/users/GuilhermeMontez/followers')
  .then(function (respostaDoServidor) {
    return respostaDoServidor.json();
  })
  .then(function (respostaCompleta) {
    console.log(respostaCompleta);
  })

  return (
    <div>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem Vindo(a) {githubUser}
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              const comunidade = {
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image'),
              }
              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas);
            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usar de capa"
                  name="image"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`}>
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </div>
  )
}