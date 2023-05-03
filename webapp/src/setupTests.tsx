import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import {setupStore} from './app/store'
import type { AppStore, RootState } from './app/store'
import {ChakraProvider} from "@chakra-ui/react";

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootState>
    store?: AppStore
}

function customRender (
    ui: React.ReactElement,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return (<Provider store={store}>
            <ChakraProvider>
                {children}
            </ChakraProvider>
        </Provider>)
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export {customRender as render }