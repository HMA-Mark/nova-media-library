import IndexField from "./field/Index/index.vue";
import DetailField from "./field/Detail/index.vue";
import FormField from "./field/Form/index.vue";
import Tool from "./tool/index.vue";

Nova.booting((app, router, store) => {
  app.component("index-media-library-field", IndexField);
  app.component("detail-media-library-field", DetailField);
  app.component("form-media-library-field", FormField);

  router.addRoute({
    name: "nova-media-library",
    path: "/media-library",
    component: Tool,
  });

  window.nmlToastHook = (e) => {
    if (422 === e.response?.status && e.response.data?.message) {
      Nova.$toast?.error(e.response.data.message);
    }
  };
});

if ("object" === typeof Nova.config.novaMediaLibrary) {
  if (Nova.config.novaMediaLibrary.store === "folders") {
    Nova.request()
      .get("/nova-vendor/nova-media-library/folders")
      .then((r) => {
        Object.assign(Nova.config.novaMediaLibrary, { folders: r.data });
      });
  }
  if ("object" === typeof Nova.config.novaMediaLibrary.lang) {
    Object.assign(Nova.config.translations, Nova.config.novaMediaLibrary.lang);
  }
}
