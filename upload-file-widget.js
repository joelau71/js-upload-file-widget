$(function() {
    uploadFileWidget = {
        init: function() {
            this.update();
            this.$body = $("body");
            this.$body.on("click", ".ufw-remove-btn", function() {
                var $wrapper = $(this).closest(".upload-file-widget-wrapper");
                $wrapper.find(".ufw-status").val("remove");
                $wrapper.find(".upload-file-widget").val("");
                $wrapper.find(".ufw-file").val("");
                $wrapper.find(".ufw-ttl").attr("href", "");
                $wrapper.removeClass("has-data");
            });

            this.$body.on("change", ".upload-file-widget", function() {
                var $this = $(this);
                var src = URL.createObjectURL($this[0].files[0]);
                var $wrapper = $this.closest(".upload-file-widget-wrapper");
                var $ttl = $wrapper.find(".ufw-ttl");
                var ttl = $this.attr("data-ufw-title");
                var path = $this.val();

                if (path == "") return false;
                var file = path.split("\\").pop();
                file = file.replace(/ /g, "_");

                $ttl.attr("href", src);
                if (ttl === undefined) {
                    $wrapper.find(".ufw-ttl").text(file);
                }

                $wrapper.find(".ufw-file").val(file);
                $wrapper.find(".ufw-status").val("upload");
                $wrapper.addClass("has-data");
            });

            this.$body.on("click", ".ufw-upload-btn", function() {
                var $wrapper = $(this).closest(".upload-file-widget-wrapper");
                var $upload = $wrapper.find(".upload-file-widget");
                $upload.trigger("click");
            });
        },

        update: function() {
            var self = this;
            $(".upload-file-widget").each(function() {
                var $this = $(this);
                if ($this.hasClass("is-upload-file-widget")) return true;
                self.wrapper($this);
            });
        },

        wrapper: function($upload) {
            var name = $upload.attr("name");
            var path = $upload.attr("data-ufw-path") || "";
            var title =
                $upload.attr("data-ufw-title") || path.split("/").pop() || "";
            var remove = $upload.attr("data-ufw-remove") || false;
            var has_data = path ? " has-data" : "";
            var group = $upload.attr("data-ufw-group") || "";

            var file = "";

            if (path) {
                file = path.split("/").pop();
            }

            $upload.addClass("is-upload-file-widget");
            $upload.wrap(`<label class="ufw-file-label"></label>`);
            var $label = $upload.parent();
            var text = `<span class="ufw-btn">UPLOAD</span>`;
            $label.append(text);

            $label.wrap(
                `<div class="upload-file-widget-wrapper${has_data} ${group}"></div>`
            );
            var $wrapper = $label.parent();

            var html = '<div class="ufw-content">';
            html += '<div class="left">';
            html += '<a href="' + path + '" class="ufw-ttl" target="_blank">';
            html += title;
            html += "</a>";
            html += "</div>";
            html += '<div class="right">';
            html += '<span class="ufw-upload-btn ufw-btn">';
            html += "Upload";
            html += "</span>";

            if (remove === "true") {
                html += '<span class="ufw-remove-btn ufw-btn">';
                html += "Remove";
                html += "</span>";
            }

            html += "</div>";
            html += "</div>";
            html +=
                '<input type="hidden" name="ufw_file_' +
                name +
                '" value="' +
                file +
                '" class="ufw-file">';
            html +=
                '<input type="hidden" name="ufw_status_' +
                name +
                '" value="static" class="ufw-status">';

            $wrapper.append(html);
        }
    };
    uploadFileWidget.init();
});
