import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './ui/components/layout/Layout/Layout.tsx';
import HomePage from './ui/pages/HomePage/HomePage.tsx';
import BooksPage from './ui/pages/BooksPage/BooksPage.tsx';
import BookDetailsPage from './ui/pages/BookDetailsPage/BookDetailsPage.tsx';
import AuthorsPage from './ui/pages/AuthorsPage/AuthorsPage.tsx';
import AuthorDetailsPage from './ui/pages/AuthorDetailsPage/AuthorDetailsPage.tsx';
import CountriesPage from './ui/pages/CountriesPage/CountriesPage.tsx';
import CountryDetailsPage from './ui/pages/CountryDetailsPage/CountryDetailsPage.tsx';
import LoginPage from './ui/pages/LoginPage/LoginPage.tsx';
import RegisterPage from './ui/pages/RegisterPage/RegisterPage.tsx';
import ProtectedRoute from './ui/components/ProtectedRoute/ProtectedRoute.tsx';
import WishListPage from './ui/pages/WishListPage/WishListPage.tsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/' element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path='books' element={<ProtectedRoute><BooksPage /></ProtectedRoute>} />
                    <Route path='books/:id' element={<ProtectedRoute><BookDetailsPage /></ProtectedRoute>} />
                    <Route path='authors' element={<ProtectedRoute><AuthorsPage /></ProtectedRoute>} />
                    <Route path='authors/:id' element={<ProtectedRoute><AuthorDetailsPage /></ProtectedRoute>} />
                    <Route path='countries' element={<ProtectedRoute><CountriesPage /></ProtectedRoute>} />
                    <Route path='countries/:id' element={<ProtectedRoute><CountryDetailsPage /></ProtectedRoute>} />
                    <Route path='wishlist' element={<ProtectedRoute><WishListPage /></ProtectedRoute>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
