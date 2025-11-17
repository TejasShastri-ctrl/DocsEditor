//  because we are using interactive things inside
"use client"

import { useState } from "react";


import { useEditorStore } from "@/app/store/use-editor-store";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { useEditorState } from "@tiptap/react";

import { type ColorResult, CirclePicker, SketchPicker } from "react-color";

import { BoldIcon, ChevronDownIcon, ItalicIcon, Link2Icon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon } from "lucide-react";

import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import {type Level} from "@tiptap/extension-heading";


import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


//! PAY ATTENTION TO THIS FUNCTION
const ImageButton = () => {
    const {editor} = useEditorStore();
    const [isDialogOpen, setIsDailogOpen] = useState(false);
    const [imgurl, setimgurl] = useState(editor?.getAttributes("link").href || "")

    const onChange = (src: string) => {
        editor?.chain().focus().setImage({src}).run();
    }

    //! PAY ATTENTION
    const onUpload = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image";

        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if(file) {
                const ImageUrl = URL.createObjectURL(file);
                onChange(ImageUrl);
            }
        }

        input.click();
    }

    const handleUrlSubmit = () => {
        if(imgurl) {
            onChange(imgurl);
            setimgurl("");
            setIsDailogOpen(false);
        }
    }

    return (
        <DropdownMenu onOpenChange={(open) => {
            if(open) {
                setValue(editor?.getAttributes("image").href || "");
            }
        }}>
            <DropdownMenuTrigger asChild>
                <button
                // onClick={() => setValue(editor?.getAttributes("link").href)} 
                className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-small">
                <Link2Icon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
                <Input placeholder="Paste Link" value={value} onChange={(e) => setValue(e.target.value)}/>
                <Button onClick={() => onChange(value)} disabled={value === ''}>
                    Apply
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}




const LinkButton = () => {
    const {editor} = useEditorStore();
    const [value, setValue] = useState(editor?.getAttributes("link").href || "")

    console.log(editor?.getAttributes("link").href, "Testing Link")

    const onChange = (href: string) => {
        editor?.chain().focus().extendMarkRange("link").setLink({href}).run();
        setValue("");
    }

    return (
        <DropdownMenu onOpenChange={(open) => {
            if(open) {
                setValue(editor?.getAttributes("link").href || "");
            }
        }}>
            <DropdownMenuTrigger asChild>
                <button
                // onClick={() => setValue(editor?.getAttributes("link").href)} 
                className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-small">
                <Link2Icon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
                <Input placeholder="Paste Link" value={value} onChange={(e) => setValue(e.target.value)}/>
                <Button onClick={() => onChange(value)} disabled={value === ''}>
                    Apply
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}



interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon
}

const TextColorButton = () => {
    const { editor } = useEditorStore();
    const value = editor?.getAttributes("textStyle").color || "#000000";
    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setColor(color.hex).run();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-small">
                <span className="text-xs">A</span>
                <div className="h-0.2 w-full" style={{ backgroundColor: value}}/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5 flex flex-col items-center gap-4">
                <div className="w-[100px] whitespace-nowrap overflow-x-auto border px-2 rounded-2xl border-neutral-500 text-sm font-semibold text-neutral-500">
                    Whitespace-nowrap is essential to make sure the content is written in one single line instead of a breaking them vertically
                </div>
                <CirclePicker color={value} onChange={onChange}/>
                <div className="w-full h-[2px] bg-neutral-300 hover:bg-blue-400 transition cursor-pointer"/>
                <SketchPicker color={value} onChange={onChange}/>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const HighlightColorButton = () => {
    const { editor } = useEditorStore();
    const value = editor?.getAttributes("textStyle").color || "#000000";
    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setHighlight({color: color.hex}).run();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-small">
                <span className="text-xs">A</span>
                <div className="h-0.2 w-full" style={{ backgroundColor: value}}/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5 flex flex-col items-center gap-4">
                <div className="border px-2 rounded-2xl border-neutral-500 text-sm font-semibold text-neutral-500">
                    Standard Values
                </div>
                <CirclePicker color={value} onChange={onChange}/>
                <div className="w-full h-[2px] bg-neutral-300 hover:bg-blue-400 transition cursor-pointer"/>
                <SketchPicker color={value} onChange={onChange}/>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


//! INCREDIBLY important lines of code.
// due to tailwing priority of classes bug, this cn util is preferred. You could use just a simple button but issues arise
const ToolbarButton = ({
    onClick, isActive, icon: Icon,
}: ToolbarButtonProps) => {
    return (
        <button onClick={onClick} className={cn(
            "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
            isActive && "bg-neutral-200/80"
        )}>
            <Icon className="size-4" />
        </button>
    )

}

export const Toolbar = () => {

    const { editor } = useEditorStore();
    console.log("Toolbar editor: ", { editor })

    const sections: {
        label: string;
        icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean;
    }[][] = [
            [
                {
                    label: "Undo",
                    icon: Undo2Icon,
                    onClick: () => editor?.chain().focus().undo().run()
                },
                {
                    label: "Redo",
                    icon: Redo2Icon,
                    onClick: () => editor?.chain().focus().redo().run()
                },
                {
                    label: "Print",
                    icon: PrinterIcon,
                    onClick: () => window.print()
                },
                // {
                //     label: "Spell Check",
                //     icon: SpellCheckIcon,
                //     onClick: () => {
                //         const current = editor?.view.dom.getAttribute("spellcheck");
                //         editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false");
                //     }
                // }
                {
                    label: "Spell Check",
                    icon: SpellCheckIcon,
                    onClick: () => {
                        const el = editor?.view.dom;
                        if (!el) return;

                        const newState = !el.spellcheck;
                        el.spellcheck = newState;

                        // Re-focus to trigger browser's spellcheck refresh
                        el.blur();
                        setTimeout(() => el.focus(), 0);
                    }
                }

            ],
            [{
                label: "Bold",
                icon: BoldIcon,
                isActive: editor?.isActive("bold"),
                onClick: () => editor?.chain().focus().toggleBold().run(),
            },
            {
                label: "Italic",
                icon: ItalicIcon,
                isActive: editor?.isActive("italic"),
                onClick: () => editor?.chain().focus().toggleItalic().run(),
            },
            {
                label: "Underline",
                icon: UnderlineIcon,
                isActive: editor?.isActive("underline"),
                onClick: () => editor?.chain().focus().toggleUnderline().run(),
            }
            ],
            [{
                label: "Comment",
                icon: MessageSquarePlusIcon,
                onClick: () => console.log("TODO : comment"),
                isActive: false,
            },
            {
                label: "List Todo",
                icon: ListTodoIcon,
                onClick: () => editor?.chain().focus().toggleTaskList().run(),
                isActive: editor?.isActive("taskList"),
            },
            {
                label: "Remove Formatting",
                icon: RemoveFormattingIcon,
                onClick: () => editor?.chain().focus().unsetAllMarks().run(),
                // isActive: false
            },

            ]
        ];


    const FontFamilyButton = () => {
        const { editor } = useEditorStore();
        const fonts = [
            { label: "Arial", value: "Arial" },
            { label: "Times New Roman", value: "Times New Roman" },
            { label: "Georgia", value: "Georgia" }
        ]

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {/* <button className={cn(
                        "h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-small"
                    )}>    -  //? won't be needing anything dynamic */}

                    <button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-small">
                        <span className="truncate">
                            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
                        </span>
                        <ChevronDownIcon className="ml-2 size-4 shrink-0" />
                    </button>
                </DropdownMenuTrigger>


                <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                    {fonts.map(({ label, value }) => (
                        <button key={value} className={cn(
                            "flex items-center gap-x-2 px-2 py-1  rounded-sm hover:bg-neutral-200/80",
                            editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80"
                        )}
                            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
                            style={{ fontFamily: value }}
                        >
                            <span className="text-small">{label}</span>

                        </button>
                    ))}

                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

    const HeadingLevelButton = () => {
        const {editor} = useEditorStore();
        
        // array of objects in TS:
        const headings = [
            { label : "Normal text", value: 0, fontSize: "16px"},
            { label : "Heading 1", value: 1, fontSize: "32px"},
            { label : "Heading 2", value: 2, fontSize: "24px"},
            { label : "Heading 3", value: 3, fontSize: "20px"},
            { label : "Heading 4", value: 4, fontSize: "18px"}
        ];

        // Why did I use a loop? Why not direct access?
        const getCurrentHeading = () => {
            for(let level=1; level<=5; level++) {
                if(editor?.isActive("heading", { level })) {
                    return `Heading ${level}`;
                }
            }

            return "Normal text"
        }

        return(
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-small">
                        <span className="truncate">
                            {getCurrentHeading()}
                        </span>
                        <ChevronDownIcon className="ml-2 size-4 shrink-0" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                    {headings.map(({label, value, fontSize}) => (
                        <button key={value} style={{fontSize}}
                        className={cn(
                            "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-80/20",
                            (value == 0 && !editor?.isActive("heading")) || editor?.isActive("heading", {level : value}) && "bg-neutral-200/80"
                        )}
                        onClick={() => {
                            if(value==0) {
                                editor?.chain().focus().setParagraph().run();
                            } else {
                                //! IMPORTANT IMPORTANT IMPORTANT. Quite a bug.
                                editor?.chain().focus().toggleHeading({level: value as Level}).run();
                            }
                        }}
                        >
                            {label}
                        </button>
                    ))}

                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

    return (
        <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
            {sections[0].map((item) => {
                return <ToolbarButton key={item.label} {...item} />
            })}


            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            <FontFamilyButton />
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            <HeadingLevelButton/>
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            {/* font size */}
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            {sections[1].map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))}

            {/* text color */}
            <TextColorButton/>

            {/* highlight color */}
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            {/* Link */}

            <LinkButton/>
            {/* Image */}
            {/* Align */}
            {/* Line height */}
            {/* List */}
            {sections[2].map((item) => (
                <ToolbarButton key={item.label} {...item} />
            ))}
        </div>
    )
}