## 技术：react react-router-dom 新版

https://reactrouter.com/docs/en/v6/getting-started/overview

https://blog.csdn.net/weixin_47091394/article/details/121772779

1.Switch 重命名为 Routes

```js
// v5
<Switch>
    <Route exact path="/"><Home /></Route>
    <Route path="/profile"><Profile /></Route>
</Switch>

// v6
<Routes>
    <Route path="/" element={<Home />} />
    <Route path="profile/*" element={<Profile />} />
</Routes>
```

2.Route 的新特性变更 ,component/render 被 element 替代

```js
import Profile from './Profile';

// v5
<Route path=":userId" component={Profile} />
<Route
  path=":userId"
  render={routeProps => (
    <Profile routeProps={routeProps} animate={true} />
  )}
/>

// v6
<Route path=":userId" element={<Profile />} />
<Route path=":userId" element={<Profile animate={true} />} />
```

history 的用法也将被替换成 navigate

```js
// v5
history.push('/home');
history.replace('/home');

// v6
navigate('/home');
navigate('/home', { replace: true });
```

### Module '"react-router-dom"' has no exported member 'withRouter'.

react-router-dom v6 版本中的 withRouter 和 Switch 已过时，可以退回到 v5 版本继续使用，或者使用 useNavigate()替代 withRouter，使用 Routes 替代 Switch。
例如：

const navigate = useNavigate()
navigate('/test') // 跳转到/test
navigate(-1) // 返回上一级
navigate(0, {replace: true})// 强制刷新当前页面并不加入路由历史

```js
So basically instead of having somthing like
...
function handleClick() {
  history.push("/home");
}
...
use something like:

// This is a React Router v6 app
import { useNavigate } from "react-router-dom";
function App() {
  let navigate = useNavigate();
  function handleClick() {
    navigate("/home");
  }
  ...
```

## Redirect 也没法使用

新版的路由需要引入 Navigate 标签，以下是案例

```js
<Router>
  <Routes>
    <Route path='/login' element={<Login />} />
    <Route path='/admin' element={<Admin />} />
    <Route path='*' element={<Navigate to='/login' />} />
  </Routes>
</Router>;
这样就可以完美替代之前Redirect的重定向操作;
```

或则：
废弃了 V5 中的 Redirect

```js
// v5 废弃了
const routers = [{ path: 'home', redirectTo: '/' }];

// 404可以这么写
const routers = [
  {
    name: '404',
    path: '*',
    element: <NoMatch />,
  },
];
```

### React Router v6 exact

```js
<Route exact>消失了。相反，具有后代路由（在其他组件中定义）的路由在其路径中使用一个尾随*符号来指示它们精确匹配。
```

```
react router v6 doesn't support exact anymore.

// old - v5 <Route exact path="/" component={Home} />

// new - v6 <Route path="/" element={<Home />} />

As stated in their documentation:

You don't need to use an exact prop on <Route path="/"> anymore. This is because all paths match exactly by default. If you want to match more of the URL because you have child routes use a trailing * as in <Route path="users/*">.
```

### 嵌套路由变得更简单

具体变化有以下：
1.Route children 已更改为接受子路由。 2.比 Route exact 和 Route strict 更简单的匹配规则。
3.Route path 路径层次更清晰。

v5 中的嵌套路由必须非常明确定义，且要求在这些组件中包含许多字符串匹配逻辑.

```js
// v5
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/profile' component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}

function Profile() {
  let { path, url } = useRouteMatch();

  return (
    <div>
      <nav>
        <Link to={`${url}/me`}>My Profile</Link>
      </nav>

      <Switch>
        <Route path={`${path}/me`}>
          <MyProfile />
        </Route>
        <Route path={`${path}/:id`}>
          <OthersProfile />
        </Route>
      </Switch>
    </div>
  );
}
```

v6 中，你可以删除字符串匹配逻辑。不需要任何 useRouteMatch()

```js
// v6
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='profile/*' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

function Profile() {
  return (
    <div>
      <nav>
        <Link to='me'>My Profile</Link>
      </nav>

      <Routes>
        <Route path='me' element={<MyProfile />} />
        <Route path=':id' element={<OthersProfile />} />
      </Routes>
    </div>
  );
}
```

```js
		// <HashRouter>
		<BrowserRouter>
			<Routes>
				{/* {routesConfig.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)} */}
				{/* <Route element={NotFound} /> */}
				{/* <Route path="/" element={<Home />} > */}
				<Route path="/">
					{/* <Route path="moments" element={<Moments />} /> */}
					<Route path="*" element={<NotFound />} />
				</Route>
				<Route path="/moments" element={<Moments />} />
			</Routes>
		{/* </HashRouter> */}
```

## 实现来回导航(使用 go、goBack、goForward)

实现来回导航(使用 go、goBack、goForward)

```js
import { useHistory } from 'react-router-dom';

function App() {
  const { go, goBack, goForward } = useHistory();

  return (
    <>
      <button onClick={() => go(-2)}>Go 2 pages back</button>
      <button onClick={goBack}>Go back</button>
      <button onClick={goForward}>Go forward</button>
      <button onClick={() => go(2)}>Go 2 pages forward</button>
    </>
  );
}
```

## 获取当前路由

```js
import { NavLink,useLocation } from "react-router-dom";
import './index.scss'

const Header =()=>{
  const { pathname } = useLocation()
  ...
}
```
