(() => {

    /* initialize or create an express router */
    const express = require('express');
    const router = express.Router();

    /* routes for dummy methods */
    const dummy = require('./dummy/dummy.method');
    router.route('/dummy').get(dummy);
    router.route('/dummy').post(dummy);
    router.route('/dummy').patch(dummy);
    router.route('/dummy').put(dummy);
    router.route('/dummy').delete(dummy);

    // TODO: add more routed methods here ...

    const get_todo = require('./todo/get.method');
    router.route('/todo').get(get_todo);

    const post_todo = require('./todo/post.method');
    router.route('/todo').post(post_todo);

    const put_todo = require('./todo/put.method');
    router.route('/todo').put(put_todo);

    const delete_todo = require('./todo/delete.method');
    router.route('/todo').delete(delete_todo);

    module.exports = router;

})();