const db = require('../models');

exports.createPost = (req, res) => {
    /* //adding userUuid to the rest of destructured post body
    const { userUuid, ...posts } = req.body
    //following line needs testing; otherwise post creation works but without adding user uuid (no auth yet)
    const User = db.User.findOne({ where: { uuid : userUuid }})
    console.log(User); */
    const post = new db.Post({
        userId: req.body.userId,
        title: req.body.title,
        category: req.body.category,
        text: req.body.title
    });
    console.log(post);
    post.save()
        .then(() => res.status(201).json({ message: 'Publication enregistrée!' }))
        .catch(error => res.status(400).json({ error: error.toString() }));
};

exports.updatePost = (req, res, next) => {
    db.Post.updateOne({ 
      uuid: req.params.id 
      }, { 
          ...req.body, uuid: req.params.id 
          })
    .then(() => res.status(200).json({ message: 'Publication modifiée !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deletePost = (req, res) => {
    db.Post.destroy({
        where: {
            uuid: req.params.uuid
        }
    })
    .then(() => res.status(200).json({ message:"Publication supprimée!" }))
    .catch(error => res.status(400).json({ error: error.toString() }));
};

exports.findAllPosts = (req, res) => {
    db.Post.findAll(
      /*   {
            include: [
                {
                    model: db.User,
                    attributes: ['first_name', 'last_name']
                }
            ]
        } */
        // { include: db.User }
        )
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({ error: error.toString() }));
};

exports.findOnePost = (req, res) => {
    db.Post.findAll({
        where: {
            uuid: req.params.uuid
        }
    })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error: error.toString() }));
};
