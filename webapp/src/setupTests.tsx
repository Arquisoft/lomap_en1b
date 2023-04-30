// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import React, { ReactElement, FC } from 'react';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { render, RenderOptions } from '@testing-library/react';
import { store } from './app/store';

type WrapperProps = {
    children: ReactElement;
};

const AllTheProviders: FC<WrapperProps> = ({ children }) => {
    return (
        <Provider store={store}>
            <ChakraProvider>
                    {children}
            </ChakraProvider>
        </Provider>
    );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
    render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };