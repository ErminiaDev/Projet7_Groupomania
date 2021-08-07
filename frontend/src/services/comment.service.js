//data service
import authHeader from './auth-header';

const currentUserToken = authHeader()["x-access-token"]

const myHeaders = new Headers();

myHeaders.append('Content-Type', 'application/json');
myHeaders.append('x-access-token', currentUserToken);


class CommentService {

  async addComment(newComment) { 
    console.log(authHeader());
    console.log(JSON.stringify(newComment));
  const res = await fetch(`http://localhost:3000/api/publications/commentaires`, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(newComment),
    })
    console.log('has attempted to fetch')
    const data = await res.json();
    console.log('jsoned');
    return data;
  }

  async destroyComment(uuid) {
    console.log(uuid)
    if (confirm(`Etes vous sûr de vouloir supprimer ce commentaire?`)) {
      await fetch(`http://localhost:3000/api/publications/commentaires/${uuid}`, {
        method: 'DELETE',
        headers: authHeader()
      })
    }
  }

}

export default new CommentService();
