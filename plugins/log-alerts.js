export default ({ app }, inject) => {
  const types = {
    crypt: {
      tag: 'event',
      tagStyle: { 
        background: 'indianred', // why are these colors supported by css
        color: 'navajowhite' 
      },
      textStyle: { 
        background: 'navajowhite', // I actually really like them
        color: 'indianred' 
      },
      subtitleStyle: null
    },
    primary: {
      tag: 'info',
      tagStyle: { 
        background: 'midnightblue', 
        color: 'lavender' 
      },
      textStyle: { 
        background: 'lavender', 
        color: 'midnightblue' 
      },
      subtitleStyle: { 
        color: 'midnightblue' 
      },
    },
    info: {
      tag: 'login',
      tagStyle: { 
        background: '#6930C3', 
        color: '#E8DEF7' 
      },
      textStyle: { 
        background: '#E8DEF7', 
        color: '#6930C3' 
      },
      subtitleStyle: { 
        color: '#966CDA' 
      },
    },
    default: {
      tag: 'info',
      tagStyle: {
        background: '#577399', 
        color: '#F7F7FF' 
      },
      textStyle: {
        background: 'none', 
        color: '#577399' 
      },
      subtitleStyle: {
        color: '#BDD5EA' 
      }
    }
  }

  const logAlert = (text, { type='default', subtitle='', customTag=undefined }) => {
    const getTagStyle = (type) => {
      return `
        background: ${types[type].tagStyle?.background ?? types.default.tagStyle.background};
        color: ${types[type].tagStyle?.color ?? types.default.tagStyle.color};
        font-weight: bold;
        margin-right: 3px;
        padding: 2px 4px;
        border-radius: 3px;
      `
    }

    const textStyle = (type) => {
      return `
        background: ${types[type].textStyle?.background ?? types.default.textStyle.background};
        color: ${types[type].textStyle?.color ?? types.default.textStyle.color};
        font-weight: bold;
        margin-right: 3px;
        padding: 2px 4px;
        border-radius: 3px;
      `
    }

    const getSubtitleStyle = (type) => {
      return `
        color: ${types[type].subtitleStyle?.color ?? types.default.subtitleStyle.color};
        font-weight: bold;
        padding: 2px 4px;
        border-radius: 3px;
      `
    }

    const tagName = customTag ?? types[type].tag ?? types.default.tag

    console.log(`%c${tagName.toUpperCase()}%c${text}%c${subtitle}`, getTagStyle(type), textStyle(type), getSubtitleStyle(type))
  }

  inject('logAlert', logAlert)
}