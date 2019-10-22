/*
    jquery required
    <input type="file" name="upload" class="upload" data-ufw-file="file.pdf" data-ufw-path="/upload">

    upload_file_widget.init($class);
    e.g.: upload_file_widget.init($(".upload"));

    upload_field_widget.generate(field, path, file) will return html element
    field: input attribute name
    path: file path
    name: fiel display name
    e.g.: var element = upload_file_widget.generate("upload", "/upload", "file.pdf");

    status:
    "": no file
    static: no change, but have the file
    remove: remove the file
    update: update the file
*/

upload_file_widget = {
    status: "inactive",
    init: function($class){
        var self = this;
        if (this.status == "active") return false;
        this.status = "active";
        this.$body = $("body");
        if ($class) {
            $class.each(function(){
                var $this = $(this);
                var field = $this.attr("name")
                var path = $this.attr("data-ufw-path");
                var file = $this.attr("data-ufw-file");
                var width = $this.attr("data-ufw-width");
                var className = $this.attr("class");
                var element = self.generate(field, path, file, className, width);
                $(element).insertAfter($this);
                $this.remove();
            });
        }
        this.$body.delegate(".ufw-btn", "click", function(){
            var $wrapper = $(this).closest(".upload-file-widget");
            $wrapper.find(".ufw-status").val("remove");
            $wrapper.find(".ufw-file").val("");
            $wrapper.removeClass("has-data");
        });

        this.$body.delegate(".ufw-file", "change", function(){
            var $this = $(this);
            var fileName = $this.val();
            var src = URL.createObjectURL($this[0].files[0]);
            var $wrapper = $this.closest(".upload-file-widget");
            var $ttl = $wrapper.find(".ufw-ttl");
            var ttl = $ttl.text();
            
            $ttl.attr("href", src);
            if (ttl == "") {
                $wrapper.find(".ufw-ttl").text(fileName);
            }

            $wrapper.find(".ufw-status").val("upload");
            $wrapper.addClass("has-data");
        });

        this.$body.delegate(".ufw-upload-btn", "click", function(){
            var $wrapper = $(this).closest(".upload-file-widget");
            var $upload = $wrapper.find(".ufw-file");
            $upload.trigger("click");
        });
    },

    generate: function(field, path, file, className, width){
        var html = "";
        var path = path || "";
        var width = width || "";
        var file = file || "";
        var has_data = "";
        var className = className || "";
        var status = "";

        if (this.status == "inactive"){
            this.init();
        }

        if (path) {
            has_data = "has-data";
            status = "static";
        }

        if (width) {
            width = `style="width:${width}px;"`;
        }
        
        html = `<div class="upload-file-widget ${has_data}" ${width}>
            <label class="ufw-file-label">
                <input type="file" name="${field}" class="ufw-file ${className}">
                <span class="btn btn-secondary">
                    UPLOAD
                </span>
            </label>
            <div class="ufw-content">
                <div class="left">
                    <a href="${path}" class="ufw-ttl" target="_blank">
                        ${file}
                    </a>
                </div>
                <div class="right">
                    <span class="btn btn-secondary ufw-upload-btn">
                        Upload
                    </span>
                    <span class="btn btn-secondary ufw-btn">
                        Remove
                    </span>
                </div>
            </div>
            <input type="hidden" name="status_${field}" value="${status}" class="ufw-status">
        </div>`;

        return html;
    }
};