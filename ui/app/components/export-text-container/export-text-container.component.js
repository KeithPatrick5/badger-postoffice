const { Component } = require('react')
const PropTypes = require('prop-types')
const h = require('react-hyperscript')
const copyToClipboard = require('copy-to-clipboard')
const { exportAsFile } = require('../../util')

const localStorage = require('store')

class ExportTextContainer extends Component {
  markAsBackedUp = () => {
    localStorage.set('seedwordsBackedUp', true)
  }

  render () {
    const { text = '', filename = '' } = this.props
    const { t } = this.context

    return h('.export-text-container', [
      h('.export-text-container__text-container', [
        h('.export-text-container__text', text),
      ]),
      h('.export-text-container__buttons-container', [
        h(
          '.export-text-container__button.export-text-container__button--copy',
          {
            onClick: () => {
              this.markAsBackedUp()
              copyToClipboard(text)
            },
          },
          [
            h('img', { src: 'images/copy-to-clipboard.svg' }),
            h('.export-text-container__button-text', t('copyToClipboard')),
          ]
        ),
        h(
          '.export-text-container__button',
          {
            onClick: () => {
              this.markAsBackedUp()
              exportAsFile(filename, text)
            },
          },
          [
            h('img', { src: 'images/download.svg' }),
            h('.export-text-container__button-text', t('saveAsCsvFile')),
          ]
        ),
      ]),
    ])
  }
}

ExportTextContainer.propTypes = {
  text: PropTypes.string,
  filename: PropTypes.string,
}

ExportTextContainer.contextTypes = {
  t: PropTypes.func,
}

module.exports = ExportTextContainer
