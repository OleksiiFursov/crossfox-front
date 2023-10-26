import {FC, MutableRefObject} from "react";

export interface iRouterConfig {
    url?: string
		baseUrl?: string,
		layout?: string,
		layouts?: Record<string, FC>
		onChange?: (prev:string, current:string) => void
}

export interface iRouterContext{
	baseUrl: string,
	onChange: (prev:string, current:string) => void,
	sUrl: string,
	setSUrl: (url: string, data: Record<string, any>) => void,
	sHistory: MutableRefObject<[string, Record<string, any>][] | null>,
	sLayout: MutableRefObject<string | null>
}

export interface iRouterLink{
	to: string,
	tagName?: string,
	children?: FC,
	data?: Record<string, string>,
	onClick?: (e:MouseEvent)=>void,
	href?: string
}

export interface iRouteConfig{
	layout: string,
}


