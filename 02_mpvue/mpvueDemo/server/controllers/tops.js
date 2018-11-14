

const {mysql} = require('../qcloud');

module.exports = async (ctx,next) => {
    const booklist = await mysql('books').select().orderBy('count','desc').limit(9);
    ctx.state.data = { booklist };

}