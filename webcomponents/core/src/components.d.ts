/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { DeckdeckgoAttributeDefinition, DeckdeckgoDeckDefinition, DeckdeckgoSlideDefinition } from "@deckdeckgo/types";
export namespace Components {
    interface DeckgoDeck {
        "animation": 'slide' | 'fade' | 'none';
        "autoSlide": 'true' | 'false';
        "autoSlideInterval": number;
        "blockSlide": (block: boolean) => Promise<void>;
        "cloneBackground": boolean;
        "deleteActiveSlide": (removeChild?: boolean) => Promise<void>;
        "direction": 'horizontal' | 'vertical' | 'papyrus';
        "directionMobile": 'horizontal' | 'vertical' | 'papyrus';
        "doPrint": () => Promise<void>;
        "embedded": boolean;
        "getActiveIndex": () => Promise<number>;
        "getDeckDefinition": () => Promise<DeckdeckgoDeckDefinition | null>;
        "getLength": () => Promise<number>;
        "getSlideDefinition": (index: number) => Promise<DeckdeckgoSlideDefinition | null>;
        "initSlideSize": () => Promise<void>;
        "isBeginning": () => Promise<boolean>;
        "isEnd": () => Promise<boolean>;
        "keyboard": boolean;
        "lazyLoadAllContent": () => Promise<void[]>;
        "loadBackground": () => Promise<void>;
        "loadFooter": () => Promise<void>;
        "loadHeader": () => Promise<void>;
        "reveal": boolean;
        "revealOnMobile": boolean;
        "slideNext": (slideAnimation?: boolean, emitEvent?: boolean) => Promise<void>;
        "slidePrev": (slideAnimation?: boolean, emitEvent?: boolean) => Promise<void>;
        "slideTo": (index: number, speed?: number | undefined, emitEvent?: boolean) => Promise<void>;
        "toggleFullScreen": () => Promise<void>;
        "toggleKeyboardAssist": (state: boolean) => Promise<void>;
    }
    interface DeckgoDoc {
        "orientation": 'portrait' | 'landscape';
        "size": 'A4' | 'A3' | 'A5';
        "zoom": number;
    }
}
declare global {
    interface HTMLDeckgoDeckElement extends Components.DeckgoDeck, HTMLStencilElement {
    }
    var HTMLDeckgoDeckElement: {
        prototype: HTMLDeckgoDeckElement;
        new (): HTMLDeckgoDeckElement;
    };
    interface HTMLDeckgoDocElement extends Components.DeckgoDoc, HTMLStencilElement {
    }
    var HTMLDeckgoDocElement: {
        prototype: HTMLDeckgoDocElement;
        new (): HTMLDeckgoDocElement;
    };
    interface HTMLElementTagNameMap {
        "deckgo-deck": HTMLDeckgoDeckElement;
        "deckgo-doc": HTMLDeckgoDocElement;
    }
}
declare namespace LocalJSX {
    interface DeckgoDeck {
        "animation"?: 'slide' | 'fade' | 'none';
        "autoSlide"?: 'true' | 'false';
        "autoSlideInterval"?: number;
        "cloneBackground"?: boolean;
        "direction"?: 'horizontal' | 'vertical' | 'papyrus';
        "directionMobile"?: 'horizontal' | 'vertical' | 'papyrus';
        "embedded"?: boolean;
        "keyboard"?: boolean;
        "onDeckDidLoad"?: (event: CustomEvent<void>) => void;
        "onMouseInactivity"?: (event: CustomEvent<boolean>) => void;
        "onSlideDrag"?: (event: CustomEvent<number>) => void;
        "onSlideNextDidAnimate"?: (event: CustomEvent<void>) => void;
        "onSlideNextDidChange"?: (event: CustomEvent<number>) => void;
        "onSlidePrevDidAnimate"?: (event: CustomEvent<void>) => void;
        "onSlidePrevDidChange"?: (event: CustomEvent<number>) => void;
        "onSlideToChange"?: (event: CustomEvent<number>) => void;
        "onSlideWillChange"?: (event: CustomEvent<number>) => void;
        "onSlidesDidLoad"?: (event: CustomEvent<any>) => void;
        "reveal"?: boolean;
        "revealOnMobile"?: boolean;
    }
    interface DeckgoDoc {
        "onSizeDidChange"?: (event: CustomEvent<{width: number; height: number}>) => void;
        "orientation"?: 'portrait' | 'landscape';
        "size"?: 'A4' | 'A3' | 'A5';
        "zoom"?: number;
    }
    interface IntrinsicElements {
        "deckgo-deck": DeckgoDeck;
        "deckgo-doc": DeckgoDoc;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "deckgo-deck": LocalJSX.DeckgoDeck & JSXBase.HTMLAttributes<HTMLDeckgoDeckElement>;
            "deckgo-doc": LocalJSX.DeckgoDoc & JSXBase.HTMLAttributes<HTMLDeckgoDocElement>;
        }
    }
}
