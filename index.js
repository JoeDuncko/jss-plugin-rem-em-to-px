/**
 * Replace all css rules with rem and em to be px
 * Intended to be used when you have no control over the document
 * Takes baseFontSize: number, which is the base font size - TODO: default this to 16
 *
 * @api public
 */
export default function jssRemEmToPx(options = {}) {
    function onProcessStyle(style, rule) {
        if (rule.type !== 'style') return style;

        //Had to add style[prop] to fix StartInCle's site, no idea why
        for (const prop in style) {
            if(style[prop] && style[prop].charAt && style[prop].slice(-3) === 'rem'){
                let newValue = style[prop].slice(0, style[prop].length-3);

                newValue = newValue * options.baseFontSize;

                style[prop] = newValue + 'px';
            }
            else if (style[prop] && style[prop].charAt && style[prop].slice(-2) === 'em'){
                let newValue = style[prop].slice(0, style[prop].length-2);

                newValue = newValue * options.baseFontSize;

                style[prop] = newValue + 'px';
            }
        }

        return style;
    }

    function onChangeValue(value, prop) {
        //TODO: fix repeat code
        if(value.charAt && value.slice(-3) === 'rem'){
            let newValue = value.slice(0, value.length-3);

            newValue = newValue * options.baseFontSize;

            value = newValue + 'px';
        }
        else if (value.charAt && value.slice(-2) === 'em'){
            let newValue = value.slice(0, value.length-2);

            newValue = newValue * options.baseFontSize;

            value = newValue + 'px';
        }
    }

    return {
        onProcessStyle,
        onChangeValue
    };
}
