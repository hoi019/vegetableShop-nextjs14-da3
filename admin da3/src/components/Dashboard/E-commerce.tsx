"use client"
import React from "react"
import ChartOne from "../Charts/ChartOne"
import ChartTwo from "../Charts/ChartTwo"
import ChatCard from "../Chat/ChatCard"
import TableOne from "../Tables/TableOne"
import CardDataStats from "../CardDataStats"
import { EyeOutlined, ShoppingCartOutlined, UserOutlined, DollarOutlined } from "@ant-design/icons"

const ECommerce: React.FC = () => {
	return (
		<>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
			{/* <CardDataStats title="Tổng lượt xem" total="$3.456K" rate="0.43%" levelUp>
				<EyeOutlined style={{ cursor: "pointer", color: '#3B82F6', fontSize: '25px' }} />
			</CardDataStats> */}
			<CardDataStats title="Tổng đơn hàng" total="$45,2K" rate="4.35%" levelUp>
				<ShoppingCartOutlined style={{ cursor: "pointer", color: '#3B82F6', fontSize: '25px' }} />
			</CardDataStats>
			<CardDataStats title="Tổng doanh thu" total="2.450" rate="2.59%" levelUp>
				<DollarOutlined style={{ cursor: "pointer", color: '#3B82F6', fontSize: '25px' }} />
			</CardDataStats>
			<CardDataStats title="Tổng tài khoản" total="3.456" rate="0.95%" levelDown>
				<UserOutlined style={{ cursor: "pointer", color: '#3B82F6', fontSize: '25px' }} />
			</CardDataStats>
			</div>

			<div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
			<ChartOne />
			<ChartTwo />

			<div className="col-span-12 xl:col-span-8">
				<TableOne />
			</div>
				<ChatCard />
			</div>
		</>
	)
}

export default ECommerce
