if(process.env.NODE_ENV === 'production'){
    module.exports ={ mongoURI: 'root:###@cluster0-wtwq4.mongodb.net/test?retryWrites=true&w=majority'}
}else{
    module.exports ={ mongoURI: 'mongodb://localhost/video-store'}

}