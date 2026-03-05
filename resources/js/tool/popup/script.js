export default {
  data() {
    return {
      folder: null
    }
  },
  computed: {
    folders() {
      return this.getFolders(this.$parent.config.folders, '/', ['/']);
    }
  },
  methods: {
    getFolders(obj, path, array) {
      for (let i in obj) {
        array.push(path+i+'/');
        if ( 'object' === typeof obj[i] )
          array = this.getFolders(obj[i], path+i+'/', array);
      }
      return array;
    },
    onPrivate(e) {
      this.$parent.item.private = e.target.checked
    },
    update() {
      let cp = this.$parent.config.can_private;
      this.$parent.loading = true;
      let data = { id: this.$parent.item.id, title: this.$parent.item.title, folder: this.folder };
      if ( cp ) data.private = Boolean(this.$parent.item.private);

      Nova.request().post('/nova-vendor/nova-media-library/update', data).then(r => {
        this.$toasted.show(this.__('Successfully updated'), { type: 'success' });
        this.$parent.loading = false;
        this.$parent.item = null;
        if ( this.folder || cp ) {
          this.$parent.clearData();
          this.$parent.get();
          this.folder = null;
        } else {
          let index = this.$parent.items.array.findIndex(x => x.id === r.data.id);
          if ( index > -1 && r.data.id ) {
            r.data.url += '?'+Date.now();
            this.$parent.items.array[index] = r.data;
          }
        }
      }).catch(e => {
        this.$parent.loading = false;
        window.nmlToastHook(e);
      });
    },
    copyUrlToClipboard(url) {
      if (!url) {
        return;
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
          this.$toasted.show(this.__('URL has been copied'), { type: 'success' });
        }).catch(() => {
          this.$toasted.show(this.__('Unable to copy URL'), { type: 'error' });
        });
        return;
      }

      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);

      const selected = document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : null;

      textarea.select();

      try {
        document.execCommand('copy');
        this.$toasted.show(this.__('URL has been copied'), { type: 'success' });
      } catch (e) {
        this.$toasted.show(this.__('Unable to copy URL'), { type: 'error' });
      }

      document.body.removeChild(textarea);

      if (selected) {
        const selection = document.getSelection();
        selection.removeAllRanges();
        selection.addRange(selected);
      }
    },
  },

  mounted() {
    document.body.classList.add('overflow-hidden');
  },
  beforeUnmount() {
    document.body.classList.remove('overflow-hidden');
  }
}
