import { FormField, HandlesValidationErrors } from 'laravel-nova'

import nmlArray from '../module/Array/'
import nmlCallback from '../module/Callback/'
import nmlFile from '../module/File/'
import nmlTrix from '../module/Trix/'

export default {
  mixins: [FormField, HandlesValidationErrors],
  components: { nmlArray, nmlFile, nmlCallback, nmlTrix },
  props: ['field'],
  data() {
    return {
      isFormField: true,
      isHidden: this.field.nmlHidden === true
    }
  },
  methods: {
    setInitialValue() {
      this.value = this.field.value || null
    },
    fill(formData) {
      let data = null

      if (this.value) {
        if (this.field.nmlArray && Array.isArray(this.value)) {
          data = this.value.map(item => item.id)
        } else if (
          !this.field.nmlArray &&
          typeof this.value === 'object' &&
          this.value.id
        ) {
          data = this.value.id
        }

        if (Array.isArray(data)) {
          data = JSON.stringify(data)
        }
      }

      // Nova 5: only append if the field is visible
      this.fillIfVisible(formData, this.field.attribute, data)
    },
    handleChange(value) {
      this.value = value
    }
  }
}
