import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common/Select/Select'

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="w-full bg-white rounded-t-lg p-6 justify-between">
        <div className="typo-h3">최근주문내역</div>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full bg-white rounded-lg h-10"></div>
      <div className="w-full bg-white rounded-lg h-10"></div>
    </div>
  )
}
