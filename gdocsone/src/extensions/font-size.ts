// Tailwind config does not include this folder, so do not make components here. Just using this folder to make extensions
// Editing a extension

import { Extension } from "@tiptap/react";
import "@tiptap/extension-text-style"

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        fontSize: {
            setFontSize: (size: string) => ReturnType
            unsetFontSize: () => ReturnType
        }
    }
}

export const FontSizeExtension = Extension.create({
    name: "fontSize",
    addOptions() {
        return {
            types: ["textStyle"]
        }
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: element => element.style.fontSize,
                        renderHTML: attributes => {
                            if(!attributes.fontSize) {
                                return {};
                            }

                            return {
                                style: `font-size: ${attributes.font}`,
                            }
                        }
                    }
                }
            }
        ]
    },
    addCommands() {
        return {
            setFontSize: (fontSize: string) => ({chain}) => {
                return chain()
                .setMark("textStyle", {fontSize}).run()
            },
            unsetFontSize: () => ({chain}) => {
                return chain().setMark("textStyle", {fontSize: null})
                .removeEmptyTextStyle().run()
            },
        }
    }
})