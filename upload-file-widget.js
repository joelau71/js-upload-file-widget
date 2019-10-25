$(function() {
    uploadFileWidget = {
        init: function(){
            this.update();
            this.$body = $("body");
            this.$body.delegate(".ufw-remove-btn", "click", function(){
                var $wrapper = $(this).closest(".upload-file-widget-wrapper");
                $wrapper.find(".ufw-status").val("remove");
                $wrapper.find(".ufw-file").val("");
                $wrapper.removeClass("has-data");
            });

            this.$body.delegate(".ufw-file", "change", function(){
                var $this = $(this);
                var fileName = $this.val();
                var src = URL.createObjectURL($this[0].files[0]);
                var $wrapper = $this.closest(".upload-file-widget-wrapper");
                var $ttl = $wrapper.find(".ufw-ttl");
                var ttl = $this.attr("data-ufw-title");
                
                $ttl.attr("href", src);
                if (ttl === undefined) {
                    $wrapper.find(".ufw-ttl").text(fileName);
                }

                $wrapper.find(".ufw-status").val("upload");
                $wrapper.addClass("has-data");
            });

            this.$body.delegate(".ufw-upload-btn", "click", function(){
                var $wrapper = $(this).closest(".upload-file-widget-wrapper");
                var $upload = $wrapper.find(".ufw-file");
                $upload.trigger("click");
            });
        },

        update: function() {
            var self = this;
            $(".upload-file-widget").each(function(){
                var $this = $(this);
                var element = "";
                if ($this.hasClass("is-upload-file-widget")) return true;
                element = self.generate($this);
                $(element).insertAfter($this);
                $this.remove();
            });
        },

        generate: function($element){

            var html = "";
            var has_data = "";
            var status = "";
            var link = "";
            var file ="";
            var file_element = "";
            var element = "";
            var field = $element.attr("name");
            var path = $element.attr("data-ufw-path") || "";
            var download = $element.attr("data-ufw-download") || "";
            var className = $element.attr("class") || "";
            var width = $element.attr("data-ufw-width") || "";
            var title = $element.attr("data-ufw-title") || "";

            $element.addClass("is-upload-file-widget ufw-file")

            var obj = $('<div>').append($element.clone()).html(); 
            var element = new String(obj);

            if (path) {
                link = path;
                file = path.split("/").pop();
                has_data = "has-data";
                status = "static";
                file_element = `<input type="hidden" name="ufw_file_${field}" value="${file}" >`;
            }

            if (download) {
                link = download;
            }

            if (width) {
                width = `style="width:${width}px;"`;
            }
            
            html = `<div class="upload-file-widget-wrapper ${has_data}" ${width}>
                <label class="ufw-file-label">
                    ${element}
                    <span class="ufw-btn">
                        UPLOAD
                    </span>
                </label>
                <div class="ufw-content">
                    <div class="left">
                        <a href="${link}" class="ufw-ttl" target="_blank">
                            ${title}
                        </a>
                    </div>
                    <div class="right">
                        <span class="ufw-upload-btn ufw-btn">
                            Upload
                        </span>
                        <span class="ufw-remove-btn ufw-btn">
                            Remove
                        </span>
                    </div>
                </div>
                ${file_element}
                <input type="hidden" name="ufw_status_${field}" value="${status}" class="ufw-status">
            </div>`;

            return html;
        }
    }
    uploadFileWidget.init();
});
