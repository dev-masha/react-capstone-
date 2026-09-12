import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'

function Navbar({ count }) {
  return (
    <nav>
      <h2>MyShop</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart ({count})</Link>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer>
      <p>Section 1: About Us | Section 2: Links | Section 3: Contact | Section 4: Social | Section 5: Copyright 2026</p>
    </footer>
  )
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <section><h3>1. Hero Banner - Welcome</h3></section>
      <section><h3>2. Featured Categories</h3></section>
      <section><h3>3. Why Choose Us</h3></section>
      <section><h3>4. Testimonials</h3></section>
      <section><h3>5. Newsletter Signup</h3></section>
    </div>
  )
}

function Products() {
  const [items, setItems] = useState([])
  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=8')
      .then(r => r.json())
      .then(d => setItems(d.products))
  }, [])
  return (
    <div>
      <h1>Products</h1>
      <section><h3>1. All Products</h3></section>
      <section><h3>2. Product Grid</h3>
        <div className="grid">
          {items.map(p => (
            <div key={p.id} className="card">
              <img src={p.thumbnail} alt={p.title} width="100" />
              <p>{p.title}</p>
              <p>${p.price}</p>
              <Link to={`/product/${p.id}`}>View Details</Link>
            </div>
          ))}
        </div>
      </section>
      <section><h3>3. Special Offers</h3></section>
      <section><h3>4. Top Brands</h3></section>
      <section><h3>5. Help Info</h3></section>
    </div>
  )
}

function Details({ addToCart }) {
  const { id } = useParams()
  const [p, setP] = useState(null)
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(r => r.json())
      .then(d => setP(d))
  }, [id])
  if (!p) return <p>Loading...</p>
  return (
    <div>
      <h1>Details</h1>
      <section><h3>1. {p.title}</h3></section>
      <section><h3>2. Image</h3><img src={p.thumbnail} width="200" alt={p.title} /></section>
      <section><h3>3. Description</h3><p>{p.description}</p></section>
      <section><h3>4. Price: ${p.price}</h3></section>
      <section><h3>5. Action</h3><button onClick={() => addToCart(p)}>Add to Cart</button></section>
    </div>
  )
}

function Cart({ cart }) {
  return (
    <div>
      <h1>Cart ({cart.length})</h1>
      <section><h3>1. Your Items</h3></section>
      <section><h3>2. List</h3>{cart.map((