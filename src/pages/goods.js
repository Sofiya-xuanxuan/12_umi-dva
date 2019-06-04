import React, { Component } from "react";
import { Button, Card } from "antd";
import { connect } from "dva";

@connect(
    state => ({
        loading:state.loading,//通过loading命名空间获取加载状态
        goodsList: state.goods // 获取指定命名空间的模型状态
    }),
    {
        addGood: title => ({
            type: "goods/addGood", // action的type需要以命名空间为前缀+reducer名称
            payload: { title }
        }),
        getList:()=>({
            type:'goods/getList'
        })
    }
)
class Goods extends Component {
    //初始化数据
    componentDidMount() {
        this.props.getList();
    }

    render() {
        return (
            <div>
                {/* 商品列表 */}
                <div>
                    {/*加载状态*/}
                    {this.props.loading.models.goods && <p>loading...</p> }
                    {this.props.goodsList.map(good => {
                        return (
                            <Card key={good.title}>
                                <div>{good.title}</div>
                            </Card>
                        );
                    })}
                    <div>
                        <Button
                            onClick={() =>
                                this.props.addGood("商品s" + new Date().getTime())
                            }
                        >
                            添加商品
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
export default Goods;