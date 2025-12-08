// using named exports for components only. default for pages
// Adding tip-tap here. Look up tiptap docs

// the starter kit provides editor tools like italic, bold, para, etc


"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'

import Image from '@tiptap/extension-image'
import ImageResize from "tiptap-extension-resize-image"
// not an official extension
import Underline from '@tiptap/extension-underline'

import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'

import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'

import TextAlign from '@tiptap/extension-text-align'

import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'

import Link from '@tiptap/extension-link'

import { useEditorStore } from '@/app/store/use-editor-store'

//custom
import { FontSizeExtension } from '@/extensions/font-size'

import { LineHeightExtension } from '@/extensions/line-height'

import { useLiveblocksExtension } from '@liveblocks/react-tiptap'
import { off } from 'process'
import { Threads } from './threads'


export const Editor = () => {

  const liveblocks = useLiveblocksExtension();

  const { setEditor } = useEditorStore();

  const editor = useEditor({
    onCreate({ editor }) {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },
    onUpdate({ editor }) {
      setEditor(editor);
    },
    onSelectionUpdate({ editor }) {
      setEditor(editor);
    },
    onTransaction({ editor }) {
      setEditor(editor);
    },
    onFocus({ editor }) {
      setEditor(editor);
    },
    onBlur({ editor }) {
      setEditor(editor);
    },
    onContentError({ editor }) {
      setEditor(editor);
    },
    editorProps: {
      attributes: {
        style: "padding-left: 56px; padding-right:56px", //this will be dynamic later which tailwind cannot handle. which is why it has been stated here
        class: "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text"
      }
    },

    extensions: [StarterKit.configure({
      history: false //Because liveblocks has its own history, which is what I have enabled
    })
      
      , FontSizeExtension,

      LineHeightExtension.configure({
        types: ["heading", "paragraph"], defaultLineHeight: "normal",
      }),
      liveblocks,
      Underline, FontFamily, TextStyle,
      TaskItem.configure({
        nested: true
      }), TaskList,
      Table,
      TableCell,
      TextStyle, Color,
      TableHeader,
      TableRow,
      Image,
      ImageResize,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https"
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"]
      })
    ],
    
  })
  return (
    //A full-sized container with horizontal scrolling, a pale background, and layout adjustments when printing.
    <div className='size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible'>
      <div className='min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'>
        <EditorContent editor={editor} />
        <Threads editor={editor} />
      </div>
    </div>
  );
};

