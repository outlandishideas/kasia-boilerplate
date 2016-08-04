import { Link } from 'react-router'
import React from 'react'
import entities from 'entities'
import HtmlToReact from 'html-to-react'
import voidElements from 'void-elements'

const parser = new HtmlToReact.Parser(React)

const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React)

/**
 * Convert common Elements to their React equivalent.
 * @param {String} html HTML string
 * @returns {Object} HtmlToReact parser
 */
export default function parse (html) {
  const counts = {}
  const imageContainers = ['div', 'p']

  const processingInstructions = [{
    shouldProcessNode: (node) => true,
    processNode: (node, children) => {
      if (!counts[node.name]) {
        counts[node.name] = 0
      }

      counts[node.name]++

      const attrs = {
        key: node.name + '-' + counts[node.name],
        ...node.attribs
      }

      if (
        imageContainers.indexOf(node.name) !== -1 &&
        children && children.length
      ) {
        const img = children.find(child => child.type === 'img')
        const index = children.indexOf(img)

        if (index !== -1) {
          return createImageContainer(node, attrs, children, index)
        }
      }

      if (node.type === 'text') {
        return entities.decodeHTML(node.data)
      }

      if (node.name === 'img') {
        attrs.style = { clear: 'both' }

        if (attrs.class) {
          const classes = attrs.class.split(' ')

          if (classes.indexOf('alignleft') !== -1) {
            attrs.style.float = 'left'
          } else if (classes.indexOf('alignright') !== -1) {
            attrs.style.float = 'right'
          }

          attrs.class = ''
        }

        return React.createElement(node.name, attrs, node.data)
      }

      if (
        node.name == 'a' &&
        attrs.href.indexOf('mailto') === -1
      ) {
        attrs.href = ''
        return <Link to={node.attribs.href} {...attrs}>{children}</Link>
      }

      if (Object.keys(voidElements).indexOf(node.name) !== -1) {
        return React.createElement(node.name, attrs, node.data)
      }

      return processNodeDefinitions.processDefaultNode(node, children)
    }
  }]

  return parser.parseWithInstructions(
    `<div>${html}</div>`,
    (node) => true,
    processingInstructions
  )
}

/**
 * Replace an image with a React component, excluding
 * most of the attributes set by WordPress.
 * @returns {Element}
 */
function createImageContainer (container, containerAttrs, children, index) {
  const img = children[index]

  children[index] = React.createElement('img', {
    alt: img.props.alt,
    src: img.props.src
  })

  containerAttrs.className += ' contains-img'
  containerAttrs.style = ''

  return React.createElement(container.name, containerAttrs, children)
}
