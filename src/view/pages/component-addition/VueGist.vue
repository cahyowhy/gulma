<template>
    <div>
        <p v-html="gistData"></p>
    </div>
</template>

<script>
    var gistUrl = 'https://gist.github.com/';
    var data = {};

    export default {
        props: {
            gistId: {
                default: '',
                type: String
            },
            file: {
                default: '',
                type: String
            }
        },
        data() {
            return {
                gistData: 'loading...',
            }
        },
        created() {
            this.getGistData(this.gistId)
        },
        methods: {
            getGistData(gistId) {
                var self = this;
                if (this.file.length > 0) {
                    data.file = this.file;
                }

                window.$.ajax({
                    url: gistUrl + gistId + '.json',
                    data: data,
                    dataType: 'jsonp',
                    timeout: 20000,
                    success: function (response) {
                        self.gistData = response.div;
                    },
                    error: function (response) {
                        console.log("error")
                    }
                });
            }
        },
    }
</script>

<style lang="scss">
    .gist-file {
        .blob-num {
            border-bottom: none;
        }
        .file {
            user-select: auto;
        }
    }
</style>