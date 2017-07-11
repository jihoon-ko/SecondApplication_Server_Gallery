module.exports = function(app, Book)
{
   app.get('/',function(req,res){
        res.render('index.html')
   });
    // CREATE BOOK
   app.post('/api/books', function(req, res){
    	var book = new Book();
	book.title = req.body.name;
    	book.author = req.body.author;
    	//book.published_date = new Date(req.body.published_date);

    	book.save(function(err){
            if(err){
            	console.error(err);
            	res.json({result: 0});
            	return;
            }
            res.json({result: 1});
    	});
    });

    // GET ALL BOOKS
    app.get('/api/books', function(req,res){
	 Book.find(function(err, books){
             if(err) return res.status(500).send({error: 'database failure'});
             res.json(books);
    	})
    }); 

    // GET SINGLE BOOK
    app.get('/api/books/:book_id', function(req, res){
    	Book.findOne({_id: req.params.book_id}, function(err, book){
            if(err) return res.status(500).json({error: err});
            if(!book) return res.status(404).json({error: 'book not found'});
            res.json(book);
    	})
    });

    // GET BOOKS BY AUTHOR
    app.get('/api/books/author/:author', function(req, res){
    	Book.find({author: req.params.author}, {_id: 0, title: 1, published_date: 1},  function(err, books){
            if(err) return res.status(500).json({error: err});
            if(books.length === 0) return res.status(404).json({error: 'book not found'});
            res.json(books);
    	})
    });

    // GET BOOKS BY TITLE
    app.get('/api/books/author/:title', function(req, res){
    	Book.find({author: req.params.title}, {_id: 0, author: 1, published_date: 1},  function(err, books){
            if(err) return res.status(500).json({error: err});
            if(books.length === 0) return res.status(404).json({error: 'book not found'});
            console.log(books);
	    //res.json(books);
    	})
    });

    // DELETE THE BOOK WHICH MATCHES WITH TITLE
    app.post('/api/books/delete/title', function(req, res){
	console.log(req.body.title);
    	Book.remove({title: req.body.title},   function(err, books){
            if(err) return res.status(500).json({error: err});
            console.log({result : 1});
    	})
    });


}

