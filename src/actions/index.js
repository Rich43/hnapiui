export const DISPLAY_TYPE = 'display';
export const UPDATE_DISPLAYED_DATA_TYPE = 'update_displayed_data';
export const UPDATE_COMMENT_TYPE = 'update_comment';
export const INSERT_ID_TYPE = 'insert_id';
export const BULK_INSERT_ID_TYPE = 'bulk_insert_id';
export const display = count => ({type: DISPLAY_TYPE, count});
export const updateDisplayedData = (id, data) => ({type: UPDATE_DISPLAYED_DATA_TYPE, id, data});
export const insertId = id => ({type: INSERT_ID_TYPE, id});
export const bulkInsertId = data => ({type: BULK_INSERT_ID_TYPE, data});
export const updateComment = (id, data) => ({type: UPDATE_COMMENT_TYPE, id, data});