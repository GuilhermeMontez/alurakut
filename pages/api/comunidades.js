import { SiteClient } from 'datocms-client';

export default async function receberdorDeRequests(request, response) {

    if(request.method === 'POST') {
        const TOKEN = 'f82013001f5374c15c5d7da140f22a';

        const client = new SiteClient(TOKEN);

    //Validar os dados, antes de sair cadastrando

        const registroCriado = await client.items.create({
            itemType: "990815",  //Model ID de "comunidades criado pelo DatoCMS"
            ...request.body, 
            // title: "Comunidade de teste",
            // imageUrl: "https://github.com/GuilhermeMontez.png",
            // creatorSlug: "Guilherme Montez"
        })

        console.log(registroCriado);
    
        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })
        return;
    }   

    response.status(404).json ({
        message: 'Ainda não temos no GET, mas o POST tem!'
    })
}