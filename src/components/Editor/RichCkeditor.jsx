import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
function uploadAdapter(loader) {
    return {
        upload: () => {
            return new Promise((resolve, reject) => {
                const body = new FormData();
                loader.file.then((file) => {
                    resolve({
                        default: `12312`,
                    });
                });
            });
        },
    };
}
function uploadPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return uploadAdapter(loader);
    };
}

const RichCkeditor = ({ body, setBody }) => {
    return (
        <CKEditor
            editor={ClassicEditor}
            data={body}
            activeClass="p10"
            config={{
                extraPlugins: [uploadPlugin],
                toolbar: {
                    shouldNotGroupWhenFull: true,
                },
            }}
            style={{ height: '100vh' }}
            onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
                setBody(data);
            }}
        />
    );
};

export default RichCkeditor;
