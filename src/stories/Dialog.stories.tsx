import type { Meta, StoryObj } from '@storybook/react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from '@/components/common/Dialog/Dialog'
import * as React from 'react'
import Button from '@/components/common/Button/Button'
import Divider from '@/components/common/Divider/Divider'

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Dialog>

export const Basic: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>모달 열기</Button>
      </DialogTrigger>
      <DialogContent needClose>
        <DialogHeader className="pb-6">기본 다이얼로그</DialogHeader>
        <Divider className="pb-6" />
        <DialogDescription>
          이 다이얼로그는 간단한 설명 텍스트를 포함할 수 있습니다.
        </DialogDescription>
        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>
          <Button>확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const WithoutCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>닫기 버튼 없는 모달</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="pb-6">타이틀</DialogHeader>
        <Divider className="pb-6" />
        <DialogDescription>
          이 모달은 우측 상단의 닫기 아이콘이 없으며, 하단 버튼을 통해 닫을 수 있습니다.
        </DialogDescription>
        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">닫기</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
