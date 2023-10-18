"use client";
import dynamic from "next/dynamic";
import styles from "./page.module.css";
import Link from "next/link";
import useFallbackImageInSSR from "./images";
// const Images = dynamic(() => import("./images"), { ssr: false });
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <ul>
        <li>
          <Link href="/gacha_record">Gacha Record</Link>
        </li>
        <li>
          <Link href="/d3_demo">Hello D3.js!</Link>
        </li>
        <li>
          <Link href="/network">Network</Link>
        </li>
        <li>
          <Link href="/vis1">Visualization 1</Link>
        </li>
        <li>
          <Link href="/vis5">Visualization 5</Link>
        </li>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/vis3">Visualization 5</Link>
        </li>
      </ul>
    </main>
  );
}
